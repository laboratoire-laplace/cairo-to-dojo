# Macros

First, let's address an important point—what are those macros above the models used for?

If you have experience with **Rust**, you're almost there. You just need to learn about the additional macros that Dojo provides. If you're unfamiliar with these macros, don't worry; we'll dissect each one together:
    
    
## Traits
    
The `derive` [**procedural macro**](https://doc.rust-lang.org/reference/procedural-macros.html) allows developers to attach code to the generated _struct_, saving time and avoiding the need to _reinvent the wheel_.
    
For the _Character_ model in the above code snippet, here's what each element in the **derive** macro means:
    
* **Drop** (_Mandatory_): Indicates that this data structure (and every field within it) is droppable—i.e., it can be removed from a scope. Generates the `Drop()` function for us.
* **Serde** (_Mandatory_): Marks this struct (and every field within it) as serializable/deserializable—can be written to a file, which in our case will be the manifest files with the ABI in JSON format. Generates the `serialize()` and `deserialize()` functions for us.
* **Clone**: Indicates that the struct (and every field within it) can be cloned when passing data to a function **without consuming the model itself**. Generates the `clone()` function for us.
* **PartialEq**: Signals that this struct (and every field within it) can be compared using the `==` operator with the same type. Generates the `eq()` and `ne()` functions for us.
* **Debug**: Allows the struct (and every field within it) to be printed using the `{:?}` format specifier—for example, in `println!()`, which will print the struct with all its fields in a _Rust-style_ format.
    
You may have noticed that in the components file, there are enums deriving another **Trait**—**Introspect**. _Introspect_ is used to inform Sozo that this enum may be introspected when invoking contracts with it as calldata. _Introspect_ is automatically included with `#[dojo::model]`, but for structures that are not Dojo models, it must be manually specified.
    
## Storage

### get!()
    
The `get!()` macro is a built-in macro provided by `#[dojo::contract]` and allows us to fetch the **model** _Character_ associated with the **entity** _caller_, which is a typical Starknet contract address. The reason why _caller_ and _Character_ are within parentheses is due to how Dojo's `get!()` macro expects entities and models—it requires both the **keys** (entity) and the models to be passed as tuples.
    
You can also fetch multiple models for an entity:
    
```rust
// Retrieve both character and inventory models for the caller simultaneously.
// Note that this works only if both Character and Inventory have the SAME
// primary key type (ContractAddress).
let (character, inventory) = get!(world, (caller), (Character, Inventory));
```

### set!()
    
The `set!()` macro is a built-in macro provided by `#[dojo::contract]` and allows us to **write** the **model** _Character_ and _Inventory_ associated with the **entity** _caller_. Note that the `set!()` macro does **not** require the model types to be provided in a separate tuple within the call arguments.
    
You can also set multiple models at once:

```rust
// By default, a system can write and mutate the world; it is 
// essentially an invoke transaction on the selector 'set_character_name'.
fn set_character_name(ref world: IWorldDispatcher, new_name: ByteArray) {
    let caller = get_caller_address();
    // Get the current character that we want to mutate.
    let mut character = get!(world, (caller), (Character));
    // Ensure that the caller has a character.
    assert!(*character.m_name != "", "Character not found");
    character.m_name = new_name;
    set!(world, (character));  // Set the new state of the character model in our world.
}
```
    
Notice how we don't have to specify the **model** **types**? The `set!()` macro allows us to provide only the modified model instance, in any order, regardless of how many different model instances are supplied, as long as the model instances' types are valid Dojo **models**.
