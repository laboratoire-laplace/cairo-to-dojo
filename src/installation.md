# Installation

## Importing Dojo

There are currently three main ways to import the Dojo toolset onto your codebase:

* Cloning the [**repo**](https://github.com/dojoengine/dojo) directly and building from source
* Using the [**Dojoup**](https://book.dojoengine.org/getting-started#install-dojo-using-dojoup) version manager
* Using the [**asdf**](https://book.dojoengine.org/getting-started#install-asdf) package manager

All the links provided will guide you through installation when using **Dojoup** or **asdf**. However, Dojo docs don't go over installing from source, so here's a quick guide filling in the blanks.

### Build from Source with Cargo

* After cloning, use **Cargo** to install **Sozo, katana, and Torii**:

```bash
$ cd dojo 
$ cargo install --locked --path ./bin/sozo 
$ cargo install --locked --path ./bin/katana 
$ cargo install --locked --path ./bin/torii
```

* Put all three in your **local** **user binaries** to ensure that your shell refers find these programs:&#x20;

```bash
$ sudo mkdir -p /usr/local/bin
$ sudo cp ./target/release/sozo ./target/release/katana ./target/release/torii \
  /usr/local/bin
```