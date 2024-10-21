# DevNet

Deploying a Dojo world onto devnet using Katana and Torii is pretty straightforward. Couple of things to confirm before proceeding:\


* Katana is the **sequencer** and to specify where the server will be hosted, the info is in the **dojo-dev.toml** for dev builds and **dojo-release.toml** for release ones, telling sozo where to connect upon **migration**
* Torii needs the world contract hash of your newly migrated world. It will act as an indexer, receiving any events emitted by the migrated world (from katana)

Here's the usual flow when deploying onto your Katana server (assuming your Katana instance is **running**:

```bash
$ echo "Cleaning manifests..."
$ sozo clean
$ echo "Building contracts..."
$ sozo build
$ echo "Migrate world onto Katana..."
$ sozo migrate apply
```


*If you ever encounter an issue where it prevents you from migrating because your '_project is dirty_', make sure to run **sozo clean** and then re-run the command.*

