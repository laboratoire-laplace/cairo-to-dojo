# Storage in Dojo

Dojo's 'storage' is actually included in the `#[dojo::contract]` macro, and all we need to do to write
and read from it is to use the `get!()` and `set!()` macros instead of the classic `.write()` and `.read()`
functions onto the storage variables directly.