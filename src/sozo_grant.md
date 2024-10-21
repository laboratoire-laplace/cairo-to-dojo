# Sozo grant

You can manually set permissions on models in your world by invoking the **grant** command from 
_sozo_ **after** you have migrated your world onto your Katana instance.

Using `sozo execute grant owner/writer`:
```bash
$ sozo auth grant writer model:Player, "<deployed world contract hash>"
$ sozo auth grant writer model:Server, "<deployed world contract hash>"
$ sozo auth grant writer model:Move, "deployed world contract hash"
$ sozo auth grant writer model:Spawn, "<deployed world contract hash>"
$ sozo auth grant writer model:Respawn, "<deployed world contract hash>"
```

For more info on how authorization works in the Dojo ecosystem, the[ Dojo docs](https://book.dojoengine.org/framework/world/authorization) go over it in details.