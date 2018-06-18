const MultiSigWalletFrozen = artifacts.require("MultiSigWalletFrozen");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const amount = new BigNumber(1 * (10 ** 18));
const zero = new BigNumber(0);

contract('MultiSigWalletFrozen', function ([owner, user1, user2, user3]) {

  beforeEach(async function () {
    this.wallet = await MultiSigWalletFrozen.new([owner, user1, user2], 2);
  });

  it("..init supply is assigned to nominated beneficier", async function () {
  });


});