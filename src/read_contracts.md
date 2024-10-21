# Read Contracts

#### Read or View Systems

In Dojo, you can mark a system in your contract to be viewable (does not invoke and mutate storage onchain):&#x20;

```rust
// Mark function as 'read-only'.
#[view]
// Notice the '@' symbol before the IWorldDispatcher? That is intentional and required.
// You can append as many parameters as you want.
fn get_character_name(world: @IWorldDispatcher) -> ByteArray {
    let caller = get_caller_address();
    let character = get!(world, (caller), (Character));
    // Making sure that the caller has a character.
    assert!(*character.m_name != "", "Character not found");
    return character.m_name.clone();
}
```

If you are confused about the `get!()` macro and it's usage here, refer to the [macros](./macros.md) section.