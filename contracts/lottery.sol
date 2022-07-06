pragma solidity ^0.4.17;

contract Lottery {
  // manager needs to be updated every time the Lottery object is instantiated.
  address public manager; // eventually will write frontend around this.
  address[] public players; // dynamic array that can only contain addresses.

  // we dont want to repeat ourselves here, so make it a re-usable modifier.
  modifier restricted() {
    require(msg.sender == manager);
    _;
  }

  constructor() public {
    // the OWNER of the Lottery contract
    manager = msg.sender; // address of who invokes the instance of this function.
  }

  // allow someone to enter themselves into the lottery.
  // for each invocation of this function, we want the address of who invoked it to be appended to the array players.
  // to enter, you need to send in some amount of eth thus we use 'payable'.
  function enter() public payable {
    // require entrants to pay minimum 0.01 ether to enter.
    require(msg.value > 0.01 ether); // used for validation, if it evaluates to true, the function proceeds
    players.push(msg.sender);
  }

  // Random numbers are tricky in Solidity. They can be manipulated in unforeseen ways.
  // This one is psuedo random and can be possibly gamed (maybe called multiple times in a short period).
  // Point of emphasis, if you KNOW all the parameters being hashed below, you can predict the number. One solution in random number generation off chain, but that kinda defeats the trustworthiness of the process.
  function random() private view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, now, players))); // returns a hash until you pass into a unint function.
  }

  // Since only the manager can pick a winner (ideally), risk of random number gaming is low.
  function pickWinner() public restricted {
    uint index=random() % players.length; // modulo returns the 'remainder' between the division of two numbers.
    players[index].transfer(address(this).balance); // Returns the address at this array position.
    // this = current contract, balance = the balance in the contract.

    // address lastWinner = players[index]; Return this value to pickWinner Function as improvement
    delete players; // delete all elements within the players array
  }

  // view = doesnt change any data in the contract
  function getPlayers() public view returns (address[]) {
    return players;
  }
}