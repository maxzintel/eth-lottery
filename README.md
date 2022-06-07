# A Sample Ethereum Lottery Contract

## Requirements

### Variables

* Manager: Address of the person who created the contract.
  * Type of address.
* Players: Array of addresses of people who have entered.
  * Array = Reference type rather than above value type. Lots of gotchas in arrays!

### Functions

* Enter: Enters a player into the lottery.
* PickWinner: Manager must be able to trigger the contract to choose a winner from the Players Array.

## Solidity Notes

### Arrays & Other Reference Types

* *Fixed Array:* Array that contains a single type of element & has an unchanging length.
  * Examples: `int[3]` => `[1,2,3]`, `bool[2]` => `[true,false]`
* *Dynamic Array:* Array that contains a single type of element but can change in size over time.
  * `int[]` => `[1,2,3]`, `bool[]` => `[true,false]`
* *Mapping:* Collection of key-value pairs. Think of JS objects and Python dictionaries. All keys must be of the same type and all values must be of the same type.
  * Examples: `mapping(string => string)` and `mapping(int => bool)`
* *Struct:* Collection of KVP's that can have different types.

```Javascript
struct Car {
  string make;
  string model;
  uint value;
}
```
