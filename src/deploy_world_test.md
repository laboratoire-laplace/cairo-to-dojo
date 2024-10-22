# Deploying a World

One important feature provided by the Dojo framework for testing is the helper functions `spawn_test_world` and `deploy_contract`. These allow us to simulate a world deployment, which is very useful when trying to test the flow of transactions between your dojo contracts and onchain.\
\
Here is a minimal template that you can use to deploy your dojo world in the testing suite in order to simulate onchain transactions and test the behavior of your world's systems:

```rust
#[cfg(test)]
mod tests {
     // Import helper functions.
     use starknet::ContractAddress;
     
     // Import world dispatcher
     use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

     // Import test utils
     use dojo::utils::test::{spawn_test_world, deploy_contract};
     use dojo::model::Model;
     
     // Deploy world with supplied components registered.
     fn deploy_world() -> IWorldDispatcher {
     
          // Deploy a world with pre-registered models.
          let models: Array<felt252> = array![<name of one of your components>::TEST_CLASS_HASH];
     
          // NOTE: All model names are converted to snake case. Import the
          // snake case versions from the same path as the components.
          // Arg 1: Namespace of the world.
          // Arg 2: A span list of all the models' class hashes to register.
         let world: IWorldDispatcher = spawn_test_world(["<project_name>"].span(), models.span());
     
         // Deploys a contract with systems.
         // Arg 2: Calldata for constructor.
         let contract_address: ContractAddress =
             world.deploy_contract('salt', <dojo_contract_name>::TEST_CLASS_HASH.try_into().unwrap());
     
         // Grant writing to components.
         // Arg 1: Component selector hash.
         world.grant_writer(Model::<ComponentName>::selector(), contract_address);
         return world;
     }
     
     #[test]
     fn test_join() {
          let mut world = deploy_world();  // Deploy our world.
          let mut my_contract = IMyContractNameDispatcher { contract_address: caller };
          
          // Simulate a caller with a contract address.
          // The next time we call a system in our contract in our deployed world,
          // the caller will have this contract address.
          let caller = starknet::contract_address_const::<0x0b>();
          
          my_contract.join();
          let _player = get!(world, (caller), (MyModelType));
     }
}
```

There's also a _testing cheat sheet_ available in the [Dojo docs](https://book.dojoengine.org/framework/testing-cheat-codes) if you need to call certain starknet testing functions to further simulate onchain activities.
