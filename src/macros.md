# Macros

## Traits

The derive [**procedural macro**](https://doc.rust-lang.org/reference/procedural-macros.html) allows developers to have code tied to the _struct_ already generated for them so that they can save time and not have to _reinvent the wheel_.

For the _Character_ model in the above code snippet, here's what each element in the **derive** macro means:

* **Drop** (_Mandatory_): Tells the compiler that this data structure (and every field inside of it) is droppable - i.e. can be removed from a scope. Generates the `Drop()` function for us
* **Serde** (_Mandatory_): Marks this struct (and every field inside of it) as serializable/deserializable - can be written to a file, which in our case will be the manifest files with the ABI in a JSON format. Generates the `serialize()` and `deserialize()` functions for us
* **Clone**: Marks the struct (and every field inside of it) can be cloned, when trying to pass the data to a function **without consuming the model itself**. Generates the `clone()` function for us
* **PartialEq**:  Signals the compiler that this struct  (and every field inside of it) can be compared with the `==` symbol with the same type. Generates the `eq()` and `ne()` functions for us
* **Debug**: Notify the compiler that this struct (and every field inside of it) can be printed using the `{:?}` format specifier - i.e. in `println!()` which will print the struct with all of its fields in a _Rust-style_ way

You may have noticed that in the components file, there are enums, which derive of another **Trait** - **Introspect**. _Introspect is there_ to tell sozo that this enum may be introspected when invoking contracts with it as calldata. _Introspect_ is automatically included with `#dojo::model]`,  however for structures that are not a **dojo model**, we need to manually specify it.

## Storage

### get!()

The macro `get!()` is a builtin macro provided by `#[dojo::contract]`, and allows us to fetch the **model** _Character_ associated with the **entity** _caller_, which is just a typical Starknet contract address. The reason why _caller_ and _Character_ are between parentheses, is due to how Dojo's _get!()_ macro expects entities and models. It requires that both the **keys** (entity) and the models passed be in tuples

You can also fetch multiple models against an entity:

```rust
// Get both character and inventory models for the caller at the same time.
// Note that this will ONLY work if BOTH Character and Inventory have the SAME
// primary key type (contractAddress).
let (character, inventory) = get!(world, (caller), (Character, Inventory));
```

### set!()

The macro `set!()` is a builtin macro provided by `#[dojo::contract]`, and allows us to **write** 
the **model** _Character_ and _Inventory_ associated with the **entity** _caller_. Note that the `set!()`
macro does **not** need the model types in a separate tuple to be provided in the call arguments.

You can also set multiple models at once:

```rust
// By default, a system will be one able to write and mutate the world, it is 
// essentially an invoke transaction on the selector 'get_character_name'
fn set_character_name(ref world: IWorldDispatcher, new_name: ByteArray) {
    let caller = get_caller_address();
    // Get the current character that we want to mutate.
    let mut character = get!(world, (caller), (Character));
    // Making sure that the caller has a character.
    assert!(*character.m_name != "", "Character not found");
    character.m_name = new_name;
    set!(world, (character));  // We set the new state of the character model in our world
}
```

Notice how we don't have to specify the **model** **types**? The `set!()` macro allows us to only provide the modified model instance, in any order as we want this time, regardless of how many different model instances we give it, as long as the model instances' types are valid dojo **models**.


