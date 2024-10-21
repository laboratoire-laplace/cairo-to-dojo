# Overlays

Overlays are are neat way to configure in a manifest file all the models you wish to authorize
your world of _writing_ and _owning_.

Using **overlays** in the **overlays/** directory

```toml
# Allow all systems within the 'tag' (contract) specified to write to all of our models.

# Example project -> test
# Example contract within test -> apply
# Example systems within the apply contract -> [join, leave, print, copy, save]
# Example models in test -> [Player, Server, Move, Spawn, Respawn].

tag = "test-apply"    # Apply these permissions for the 'apply' contract within 'test'.
writes = ["ns:test"]  # Be able to write to all models within the namespace (ns) 'test'.

For more info on how authorization works in the Dojo ecosystem, the[ Dojo docs](https://book.dojoengine.org/framework/world/authorization) go over it in details.