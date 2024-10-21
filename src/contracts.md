# Contract Setup

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
Below is a minimal example of how to structure a Dojo contract so that the world can call upon that contract (i.e. with `sozo execute`).  Every contract that interacts with the world should be placed under the **src/** folder to get picked up by sozo when compiling.

```rust
// Basic (and incomplete) Dojo contract template with a rock/paper/scissors game.

use starknet::ContractAddress;
use project_example::models::Choice;

#[dojo::interface]  // MANDATORY
trait IRPS {
    fn join(ref world: IWorldDispatcher) -> ();
    fn start(ref world: IWorldDispatcher) -> ();
    fn play(ref world: IWorldDispatcher, player_one_move: Choice,
        player_two_move: Choice) -> ();
    fn leave(ref world: IWorldDispatcher) -> ();
}

#[dojo::contract]  // MANDATORY
mod rps {
    use starknet::ContractAddress;
    use project_example::models::Choice;
    
    // All internal functions (not visible in the ABI).
    //
    // OPTIONAL
    fn _determine_winner(player_one_move: Choice, player_two_move: Choice) -> u8 {
        return match (player_one_move, player_two_move) {
            (Choice::Rock, Choice::Paper) => 2,        // Second player wins.
            (Choice::Rock, Choice::Rock) => 0,         // Tie.
            (Choice::Paper, Choice::Rock) => 1,        // First player wins.
            (Choice::Rock, Choice::Scissor) => 1,      // First Player wins.
            (Choice::Scissor, Choice::Rock) => 2,      // Second player wins.
            (Choice::Scissor, Choice::Paper) => 1      // First player wins.
            (Choice::Paper, Choice::Scissor) => 2,     // Second player wins.
            (Choice::Scissor, Choice::Scissor) => 0,   // Tie.
        };
    }
    
    // This internal init function acts as a constructor, where it will only be 
    // ran once, when the contract is deployed.
    //
    // OPTIONAL
    fn dojo_init(ref world: IWorldDispatcher) {
        // Do Something that should only be ran once and at the beginning...
    }
    
    // All public functions (visible in the ABI).
    #[abi(embed_v0)]
    impl IRPSImpl of IRPS&#x3C;ContractState> {
        // MANDATORY
        fn join(ref world: IWorldDispatcher) -> () {
            //  Add logic...
        }
        
        // MANDATORY
        fn start(ref world: IWorldDispatcher) -> () {
            //  Add logic...
        }
        
        // MANDATORY
        fn play(ref world: IWorldDispatcher, player_one_move: Choice,
            player_two_move: Choice) -> () {
            //  Add logic...
        }
        
        // MANDATORY
        fn leave(ref world: IWorldDispatcher) -> () {
            //  Add logic...
        }
    }
```

<i>Note: It is strongly recommended to treat your dojo contracts, as specific **actions** and **behaviors** that your world will need to have. You should separate contracts and condense them as much as possible to favor composability as opposed to a 'main' contract that will hold all the logic of the world.</i>
