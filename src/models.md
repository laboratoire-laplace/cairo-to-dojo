# Models

In order to set up your contracts in your Dojo world, I recommend designing the systems around the entities and models instead of the inverse. By clearly defining what the models are going to require data-wise, and what they represent, you can implement the systems that are going to work around them more easily and efficiently, without going back and forth every time the models change - as this is inevitable as compute and storage requirements evolve during development.

### In Practice

Here's a small and barebones minecraft clone to provide as an example of real applications using Dojo as we explain the basic boilerplate code to append to your models and entities to make them work with Katana and Torii:

#### models/components.cairo

```rust
// All models supported in the game and stored onchain.

#[derive(Drop, Clone, Serde, PartialEq, Debug)]
#[dojo::model]
struct Character {
    #[key]
    m_ent_player_addr: ContractAddress,  // Who this character belongs to.
    m_alias: ByteArray,  // The name that they have chosen to display to others.
    m_player_index: u8  // The nth player in the world.
}

#[derive(Drop, Clone, Serde, PartialEq, Debug)]
#[dojo::model]
struct Inventory {
    #[key]
    m_ent_player_addr: ContractAddress,
    m_size: u32,
    m_stack_limit: u32,
    m_items: Array<BlockType>
}

#[derive(Drop, Clone, Serde, PartialEq, Debug)]
#[dojo::model]
struct Hotbar {
    #[key]
    m_ent_inventory_addr: ContractAddress,
    m_items: Array<BlockType>
}

#[derive(Drop, Copy, Serde, PartialEq, Debug, Introspect)]
enum BlockType {
    Grass: (),
    Wood: (),
    Water: (),
    Stone: (),
    Ore: OreType
    // etc...
}

#[derive(Drop, Copy, Serde, PartialEq, Debug, Introspect)]
enum OreType {
    Diamond,
    Gold,
    Iron,
    Coal
    // etc...
}

 
// And way more... 
```
