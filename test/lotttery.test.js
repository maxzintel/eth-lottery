const assert = require('assert');
const { exec } = require('child_process');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // Capital W means we are the constructor here.
const web3 = new Web3(ganache.provider()); // instantiating the constructor above. attempts to connect to local test network. Different providers will be set for 'production' networks.
const { interface, bytecode } = require('../compile');

let accounts;
let lottery;

beforeEach(async () => {
  accounts  = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode})
    .send({ from: accounts[0], gas: '1000000'});
});


describe('Lottery', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('allows one person to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('1','ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(1, players.length);
    assert.equal(accounts[0], players[0]);
  })

  it('allows many people to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('1.14','ether')
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.98','ether')
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('2.45','ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(3, players.length);
    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
  });

  it('requires a minimum amount of ether to enter', async () => {
    let executed;
    // attempt to run the code inside the curly bois
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.001','ether')
      });
      executed = 'success'; // fail test if this runs successfully.
      // if something goes wrong, the catch statement is triggered.
    } catch (err) {
      executed = 'fail'; // check for 'truthiness' with assert
    }

    assert.equal('fail', executed);
  });

  it('requires the manager to pickWinner', async () => {
    let executed;
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei('0.21','ether')
      });

      await lottery.methods.pickWinner().send({
        from: accounts[1],
      });
      executed = 'success';
    } catch (err) {
      executed = 'fail';
    }

    assert.equal('fail', executed);
  });

  it('sends money to the winner', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2','ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    const winningBalance = await web3.eth.getBalance(accounts[0]);
    const dif = winningBalance - initialBalance;

    // 1.8 here allows for some gas fees. It is rough though and could be improved. Maybe get gas fees as consts too to get exact value that would be in the winning account.
    assert.ok(dif > web3.utils.toWei('1.8', 'ether'));
  });
});