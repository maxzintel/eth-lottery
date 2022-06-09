pragma solidity ^0.4.17;

contract Lottery {
  // manager needs to be updated every time the Lottery object is instantiated.
  address public manager; // eventually will write frontend around this.
  address[] public players; // dynamic array that can only contain addresses.

  function Lottery( ) public {
    // the OWNER of the Lottery contract
    manager = msg.sender; // address of who invokes the instance of this function.
  }

  // allow someone to enter themselves into the lottery.
  // for each invocation of this function, we want the address of who invoked it to be appended to the array players.
  // to enter, you need to send in some amount of eth thus we use 'payable'.
  function enter() public payable {
    players.push(msg.sender);
  }
}