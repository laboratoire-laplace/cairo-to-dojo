# Configuration

If we take the project structure from the [**zKTT** ](https://github.com/webisoftSoftware/zktt/)repo as reference, here's how the file structure could look like upon creating an initial dojo project:

```
zktt/
|── assets                           # Contains all the assets (textures, images, fonts, etc...).
|── manifests
    └── dev/
        └── base/                    # Contains the the base manifests of the world (auto-generated).
            └── abis/                # Contains base world system, event, and model ABIs (generated after sozo build).
            |── dojo-base.toml    
            └── dojo-world.toml
        └── deployment/
            └── abis/
                └── contracts/       # Contains all contract ABIs (generated after sozo build).
                └── models/          # Contains all model ABIs (generated after sozo build).
                |── dojo-base.json    
                └── dojo-world.json
            |── manifest.json        # Contains the all the world data manifest (generated after sozo build).
            └── manifest.toml        # Contains any added values in the dojo-dev/dojo-release.toml (generated after sozo build)
|── overlays
    └── dev/
        |── table.toml               # Contains all permissions for writing to models in the zktt-table contract.
├── src/
    └── models/                      # Model source directory.
    └── systems/                     # System source directory.
    └── tests/                       # Integration tests go here.
        ├── test_basic.cairo            
        └── lib.cairo                # Test module.
    └── lib.cairo                    # Root module.
├── Scarb.toml                       # Project's manifest file, contains metadata and dependencies.
├── Scarb.lock
├── dojo-dev.toml                    # Config for release profile .
├── dojo-release.toml                # Config for dev profile.
```

### Dojo Manifests

Below is an example of what to minimally include in the main **Scarb.toml** file located at the root of the dojo project directory.

```toml
[package]
name = "project_example"  # Your preferred world name
version = "1.0.0"  # Your project's preferred version scheme.

# Need to import dojo. Tag version should match the release version on github.
# NOTE: Make sure that Sozo and Katana match versions, otherwise migrating to katana will fail.
[dependencies]
starknet = "2.7.0"  # Need to force cairo to be version 2.7.0 (latest supported version as of the day writing this)
dojo = {git = "https://github.com/dojoengine/dojo"}  # Fetch latest version.

# Needed to point to dojo_*.toml for sozo commands like migrate apply, grant, execute, etc...
[[target.dojo]]
```

Furthermore, **dojo\_dev.toml** and **dojo\_release.toml** are manifest files that contain the configuration needed by sozo for **deployment**. Dojo-dev only firing for the dev builds and release only being applied for release builds.\
\
Example dev manifest:

```toml
// Example dojo_dev.toml

[world]
name = "Example World"
description = "Powered by Starknet and Dojo"
cover_uri = "file://assets/cover.png"
icon_uri = "file://assets/icon.png"

[namespace]
default = "test"  # This will be useful when setting permissions.

[env]
# Default port assigned to Katana, when starting the server.
# Change this if you plan on starting the Katana server on a custom port.
rpc_url = "http://localhost:5050/"
# Default account for katana with seed = 0
account_address = "0x127fd5f1fe78a71f8bcd1fec63e3fe2f0486b6ecd5c86a0466c3a21fa5cfcec"
private_key = "0xc5b2fcab997346f3ea1c00b002ecf6f382c5f9c9659a3894eb783c5320f912"
# Remove this line upon first deployment and put it back with your newly created
# world contract hash upon successful deployment to be able to interact with 
# Torii and Katana properly.
world_address = "0x55fe412440c3303d253485ed7486dafd735b1b0b3a3563fa8e3f7410efffff"
```

