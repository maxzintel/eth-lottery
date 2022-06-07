pragma solidity ^0.4.17;

contract Lottery {
  // manager needs to be updated every time the Lottery object is instantiated.
  address public manager; // eventually will write frontend around this.

  function Lottery( ) public {
    // the OWNER of the Lottery contract
    manager = msg.sender; // address of who invokes the instance of this function.
  }
}