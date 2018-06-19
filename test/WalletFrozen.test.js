const WalletFrozen = artifacts.require("WalletFrozen");
const SkymapTokenMock = artifacts.require("SkymapTokenMock");
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

contract('WalletFrozen', function ([owner, user1, user2, user3]) {

  beforeEach(async function () {
      this.token = SkymapTokenMock.new(owner);
  });

  it("..wallet is init correctly", async function () {
    // let wallet = await WalletFrozen.new(this.token, user1, min);
    // console.log(wallet);
  });


});