# Lexicon

First things first, let's talk about the basic semantics that dojo brings to the table. Most notably, its **ECS** to store and retrieve data onchain. We won't go into too much details regarding the definitions and theory behind Dojo's **ECS**. We will instead go more in-depth over the implementation details, as the docs fail to notify first-time users about certain features and pitfalls.

### Definitions


*You may see the word **components** being thrown around in some of the linked documentations or in this guide. In this context, the word is just a simple synonym for **models** and can be interchanged with it at any point.*


* **Katana** is the **sequencer** that acts as devnet onchain to simulate an onchain environment. Used mainly for testing unless paired with **Slot**
* **Torii** is the **indexer** that deserializes incoming data onchain, useful for reading events triggered by the world and querying model states
* Every dojo **world** is a **centralized Starknet contract** that contains a set of contracts
* Every **system** is a **function or selector** in a dojo contract
* A component or **model** in Dojo is just a Cairo struct with automatic on-chain introspection
* Every **model** must contain at least **one key**. A **model** can contain multiple **keys** as long as there is at least **one element that is not a key**
* **Entities** are defined by the **keys** inside the models that associate with them

### Relationships

* Both Katana and Torii have an allowed-cors argument that is useful for whitelisting/blacklisting domains
* Torii doesn't need to run if you simply want to execute contracts in your world. If there is a third party that wants to read data from onchain however, it is strongly recommended to have it running
* Dojo contracts all live within the centralized world contract, most likely as class hashes in its storage
* Dojo models are stored as key-value pairs in storage in the **world** they reside, like in a Map
* Your world **emits events** that are sent to **Katana** as transactions, then **Torii captures these events**, indexes them in its db, and proceeds to deserializing the event contents for anyone listening on those that wants to have the state change in a API-like format
* Although missing from the Dojo docs, **read selectors** are supported for Dojo contracts to read from storage (more on that in [Setting up Systems](cairo-to-dojo-starter.md#setting-up-systems))

First, let's address the elephant in the room - what the hell are those macros above the models used for?&#x20;

If you have tackled some **Rust** before, then you're almost there! You only need to learn about the additional macros that dojo provides. If you are trembling in your boots at the sight of the above macros, then don't worry, we will dissect each one together:
