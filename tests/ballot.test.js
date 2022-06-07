const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Capital W means we are the constructor here.
const web3 = new Web3(ganache.provider()); // instantiating the constructor above. attempts to connect to local test network. Different providers will be set for 'production' networks.
const { interface, bytecode } = require('../compile');

let accounts;
beforeEach(async () => {
  accounts  = await web3.eth.getAccounts();

  ballot = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [] })
    .send({ from: accounts[0], gas: '1000000 '});
});

describe('Ballot', () => {
  it('deploys a contract', () => {
    assert.ok(ballot.options.address);
  });

  it('knows the manager address', async () => {
    const manager = await ballot.methods.manager().call();
    assert.notEqual(manager, null);
  })
});