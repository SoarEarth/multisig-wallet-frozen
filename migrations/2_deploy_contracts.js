var MultiSigWalletFrozen = artifacts.require("./MultiSigWalletFrozen.sol");

const owner = web3.eth.accounts[0];
const user1 = web3.eth.accounts[1];
const user2 = web3.eth.accounts[2];

module.exports = function(deployer) {
  deployer.deploy(MultiSigWalletFrozen, [owner, user1, user2], 2);
};
