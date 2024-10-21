# Cairo-to-Dojo-Starter

## Setting up Systems

Dojo systems are just functions that either mutate or fetch model data onchain depending on the logic specified in them. They have a bit of boilerplate code that needs to be adhered, otherwise sozo will NOT compile. Here's the general system signature that you need to have to get started.

### Interfaces

First up, just like a typical Cairo contract, you need to set up your contract interface:

```rust
// All the systems relevant to the minecraft example world 
// used in the previous code snippets

#[dojo::interface]
trait IWhatever {
    // Add your trait functions here...
}
```

The `#[dojo::interface]` acts very much like the `#[starknet::interface]`, the only difference seems to be that the former has _IWorldDIspatcher_ defined,  making it possible for systems defined within the interface block to use the world as a parameter.

### Systems

There are two types of systems in a dojo contract, just like in a typical Cairo contract: **read** and **write** contracts.

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

### Testnet/Mainnet

To deploy a Dojo world onto testnet or mainnet, is at the time of recording only possible through [**Cartridge's Slot**](https://github.com/cartridge-gg/slot). This is bound to change, so make sure to follow their [**X**](https://x.com/cartridge\_gg) and the [**Dojo** **discord server**](https://discord.gg/dojoengine).
