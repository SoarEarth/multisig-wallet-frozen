const MultiSigWalletFrozen = artifacts.require("MultiSigWalletFrozen");

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('MultiSigWalletFrozen', function ([owner, user1, user2, user3]) {

  const yearInSeconds = 31556952;
  const lock = Math.round(Date.now() / 1000) + yearInSeconds; //1 year lock

  beforeEach(async function () {
  });

  it("..multisig wallet is created successfully", async function () {
    let wallet = await MultiSigWalletFrozen.new([owner, user1, user2], 2, lock);
  });


});