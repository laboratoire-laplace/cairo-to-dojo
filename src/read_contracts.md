# Read Contracts

#### Read or View Systems

In Dojo, you can mark a system in your contract to be viewable (does not invoke or mutate storage onchain):

```rust
// Mark function as 'read-only'.
#[view]
// You can append as many parameters as you want.
fn get_character_name(world: @IWorldDispatcher) -> ByteArray {
    let caller = get_caller_address();
    let character = get!(world, (caller), (Character));
    // Ensure that the caller has a character.
    assert!(*character.m_name != "", "Character not found");
    return character.m_name.clone();
}
```

If you are confused about the `get!()` macro and its usage here, refer to the [macros](./macros.md) section.
