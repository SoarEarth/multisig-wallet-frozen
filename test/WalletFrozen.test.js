const WalletFrozen = artifacts.require("TokenTimelock");
const SkymapTokenMock = artifacts.require("SkymapTokenMock");
const BigNumber = web3.BigNumber;

const time = require('./helpers/time');

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const amount = 10 ** 18;

contract('WalletFrozen', function ([owner, beneficier, _]) {

  beforeEach(async function () {
    let timestamp = time.latestTime();
    const lock = timestamp + time.duration.years(1); //1 year lock
    this.token = await SkymapTokenMock.new(owner);
    this.wallet = await WalletFrozen.new(this.token.address, beneficier, lock);
  });

  it("..wallet can receive token", async function () {
    await this.token.transfer(this.wallet.address, amount, { from: owner }).should.be.fulfilled;
    let balance = await this.token.balanceOf(this.wallet.address);
    balance.should.be.bignumber.equal(amount);
  });

  it("..wallet can't release token before lockout period", async function () {
    await this.token.transfer(this.wallet.address, amount, { from: owner });
    await this.wallet.release({ from: beneficier }).should.be.rejected;
  });

  it("..wallet can release token before lockout period", async function () {
    let lock = await this.wallet.releaseTime();
    await this.token.transfer(this.wallet.address, amount, { from: owner });
    let increaseTo = lock.add(time.duration.seconds(1));
    await time.increaseTimeTo(increaseTo);
    await this.wallet.release({ from: beneficier }).should.be.fulfilled;
    let balance = await this.token.balanceOf(beneficier);
    balance.should.be.bignumber.equal(amount);
  });

});