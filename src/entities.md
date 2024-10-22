# Entities

As far as Dojo is concerned, _entities_ are just **keys** that map to the **models** in storage. 
Dojo's documentation outlines clear rules when marking _fields_ as _keys_:

- There must be **at least one** key per model's data.
- There needs to be **at least one field** that is not a key.
- **Every** key must be provided when using the `get!()` macro for the model containing those keys.
