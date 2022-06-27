// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
require('dotenv').config()

// Uses a test wallet on the Goerli network, directly injects seed phrase to create provider.
const mnemonic = process.env.MNEMONIC;
// Set provider to testnet wallet on goerli net.
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonic
  },
  providerOrUrl: "https://goerli.infura.io/v3/66c4e9c4fd7442329120d4567c8d5cf5"
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode})
    .send({ gas: '1000000', from: accounts[0] });

  console.log(interface);
  console.log('Deployed Contract to ', result.options.address);
  provider.engine.stop();
};

deploy();