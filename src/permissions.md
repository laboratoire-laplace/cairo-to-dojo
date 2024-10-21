# Permissions

Every Dojo world can have permissions so that certain models in the world storage can/can't be written to. This is useful if we need to enforce some contracts to not be able to mutate models to maintain integrity depending on the logic implemented.

All the Dojo systems within every contract in the world will **not** be able to write to models by default. Thus, you need to whitelist systems or contracts if your contracts mutate the world models (which they  almost always do).

There are two ways to set permissions on Dojo models:

1. &#x20;Using **overlays** in the **overlays/** directory

2. Using `sozo execute grant owner/writer` to manually set permissions on models in the command-line **after** migrating the world onto Katana.