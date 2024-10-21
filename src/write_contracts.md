# Invoke Contracts

In Dojo, _write_ contracts are just regular systems that can mutate the world by setting some
models to a new state onchain.

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

If you are confused about the `set!()` macro and it's usage here, refer to the [macros](./macros.md) section.