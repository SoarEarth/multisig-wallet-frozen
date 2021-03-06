// Increases ganache time by the passed duration in seconds
module.exports = {
  increaseTime: function(duration) {
    const id = Date.now();
  
    return new Promise((resolve, reject) => {
      web3.currentProvider.sendAsync({
        jsonrpc: '2.0',
        method: 'evm_increaseTime',
        params: [duration],
        id: id,
      }, err1 => {
        if (err1) return reject(err1);
  
        web3.currentProvider.sendAsync({
          jsonrpc: '2.0',
          method: 'evm_mine',
          id: id + 1,
        }, (err2, res) => {
          return err2 ? reject(err2) : resolve(res);
        });
      });
    });
  },
  increaseTimeTo: function(target) {
    let now = this.latestTime();
    if (target < now) throw Error(`Cannot increase current time(${now}) to a moment in the past(${target})`);
    let diff = target - now;
    return this.increaseTime(diff);
  },
  latestTime: function() {
    return web3.eth.getBlock('latest').timestamp;
  },
  duration: {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
  }
} 