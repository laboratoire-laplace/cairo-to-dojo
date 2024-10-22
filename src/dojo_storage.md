# Storage in Dojo

Dojo's **storage** is integrated within the `#[dojo::contract]` macro. To write and read from it, use the `get!()` and `set!()` macros instead of the traditional `.write()` and `.read()` functions on storage variables directly.
