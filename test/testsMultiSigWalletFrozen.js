const MultiSigWalletFrozen = artifacts.require("MultiSigWalletFrozen");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const amount = new BigNumber(1 * (10 ** 18));
const zero = new BigNumber(0);
const now = Math.round(Date.now() / 1000);
const min = Math.round(now + 60);
const mins10 = Math.round(now + (60 * 10));
const hour = Math.round(now + (60 * 60));

contract('MultiSigWalletFrozen', function ([owner, user1, user2, user3]) {

  beforeEach(async function () {
  });

  it("..multisig with thawingTime now is working from start", async function () {
    let wallet = await MultiSigWalletFrozen.new([owner, user1, user2], 2, now);
    let actualOwners = await wallet.getOwners();
    console.log(actualOwners)

  });


});