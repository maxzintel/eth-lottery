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

```Solidity
contract TestArrays {
  uint[] public myArray; // Note since this is public, we automatically get a function to access the value. When its an array like here, we need to always pass the argument/index of what array item we want. We cannot just return the whole array by calling the base fnc.

  function TestArrays() public {
    myArray.push(1); // sets value at index 0 to 1.
    myArray.push(10); // sets value at index 1 to 10.
  }

  // Return the whole array
  function getMyArray() public view returns (uint[]) {
    return myArray;
  }

  function getArrayLength() public view returns (unint) {
    return myArray.length;
  }

  function getFirstElement() public view returns (uint) {
    return myArray[0];
  }
}
```

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
