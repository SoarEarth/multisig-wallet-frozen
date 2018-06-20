const MultiSigWalletFrozen = artifacts.require("MultiSigWalletFrozen");
const SkymapTokenMock = artifacts.require("SkymapTokenMock");
const BigNumber = web3.BigNumber;

const time = require('./helpers/time');

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const amount = 10 ** 18;

contract('Wallets', function ([owner, beneficier1, beneficier2, beneficier3, _]) {

  beforeEach(async function () {
    let timestamp = time.latestTime();
    let lock = timestamp + time.duration.years(1); //1 year lock
    this.token = await SkymapTokenMock.new(owner);
    this.wallet = await MultiSigWalletFrozen.new([beneficier1, beneficier2, beneficier3], 2, lock);
  });

  it("..multisig wallet can receive token", async function () {
    await this.token.transfer(this.wallet.address, amount, { from: owner }).should.be.fulfilled;
    let balance = await this.token.balanceOf(this.wallet.address);
    balance.should.be.bignumber.equal(amount);
  });

  it("..multisig wallet can't release token before lockout period", async function () {
    await this.token.transfer(this.wallet.address, amount, { from: owner });
    let request = this.token.transfer.request(beneficier1, amount, { from: beneficier1 });
    let data = request.params[0].data;
    await this.wallet.submitTransaction(this.token.address, "0x0", data, { from: beneficier1 }).should.be.rejected;
  });

  it("..multisig wallet can release token after lockout period", async function () {
    await this.token.transfer(this.wallet.address, amount, { from: owner });
    let lock = await this.wallet.releaseTime();
    let increaseTo = lock.add(time.duration.seconds(1));
    await time.increaseTimeTo(increaseTo);
    let request = this.token.transfer.request(beneficier1, amount, { from: beneficier1 });
    let data = request.params[0].data;
    await this.wallet.submitTransaction(this.token.address, "0x0", data, { from: beneficier1 }).should.be.fulfilled;
    this.wallet.confirmTransaction(0, { from: beneficier2 }).should.be.fulfilled;
    let balance = await this.token.balanceOf(beneficier1);
    balance.should.be.bignumber.equal(amount);

  });

});