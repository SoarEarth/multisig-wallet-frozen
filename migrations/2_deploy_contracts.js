var MultiSigWalletFrozen = artifacts.require("./MultiSigWalletFrozen.sol");
var fs = require('fs');

const yearInSeconds = 31556952;
const dayInSeconds = 86400;
// TODO update this value when we know the final data
const publicSaleEnd = Math.round(Date.now() / 1000); 

const teamLock = publicSaleEnd + yearInSeconds; //1 year lock
const reserveLock1 = publicSaleEnd + yearInSeconds; //1 year lock
const reserveLock2 = publicSaleEnd + (2 * yearInSeconds); //2 years lock
const communityLock1 = publicSaleEnd + yearInSeconds; //1 year lock
const communityLock2 = publicSaleEnd + (2 * yearInSeconds); //2 years lock
const communityLock3 = publicSaleEnd + (3 * yearInSeconds); //3 years lock
const partnershipsLock = publicSaleEnd + (60 * dayInSeconds); //60 dayes lock
const presaleBonusLock = publicSaleEnd + (60 * dayInSeconds); //60 dayes lock

const owner1 = web3.eth.accounts[0];
const owner2 = web3.eth.accounts[1];
const owner3 = web3.eth.accounts[2];

const owners = [owner1, owner2, owner3];
const required = 2;

module.exports = function(deployer) {
  let wallets = {};

  deployer.deploy(MultiSigWalletFrozen, owners, required, teamLock)
    .then(res => {
      wallets[res.address] = createWallet('Team', owners, teamLock);
      return deployer.deploy(MultiSigWalletFrozen, owners, required, reserveLock1);
    })
    .then(res => {
      wallets[res.address] = createWallet('Reserve 1', owners, reserveLock1);
      return deployer.deploy(MultiSigWalletFrozen, owners, required, reserveLock2);
    }).then(res => {
      wallets[res.address] = createWallet('Reserve 2', owners, reserveLock2);
      return deployer.deploy(MultiSigWalletFrozen, owners, required, communityLock1);
    }).then(res => {
      wallets[res.address] = createWallet('Community 1', owners, communityLock1);
      return deployer.deploy(MultiSigWalletFrozen, owners, required, communityLock2);
    }).then(res => {
      wallets[res.address] = createWallet('Community 2', owners, communityLock2);
      return deployer.deploy(MultiSigWalletFrozen, owners, required, communityLock3);
    }).then(res => {
      wallets[res.address] = createWallet('Community 3', owners, communityLock3);
      return deployer.deploy(MultiSigWalletFrozen, owners, required, partnershipsLock);
    }).then(res => {
      wallets[res.address] = createWallet('Partnerships', owners, partnershipsLock);
      return deployer.deploy(MultiSigWalletFrozen, owners, required, presaleBonusLock);
    }).then(res => {
      wallets[res.address] = createWallet('Presale Bonus', owners, presaleBonusLock);
    }).then(res => {
      let networkId = web3.version.network;
      switch(networkId){
        case '5777':
          writeObjectInFile({wallets: wallets}, './build/wallets.json');
          break;
        case '4': 
          writeObjectInFile({wallets: wallets}, './config/wallets-rinkeby.json');
          break;
        case '1':
          writeObjectInFile({wallets: wallets}, './config/wallets.json');
          break;
      }
    });
};

function createWallet(name, owners, lock) {
  return {
    name: name,
    owners: {
      [owners[0]]: 'owner1',
      [owners[1]]: 'owner2',
      [owners[2]]: 'owner3'
    },
    tokens: {
    },
    lock: lock
  };
}

function writeObjectInFile(object, path){
  return new Promise(function (resolve, reject) {
      let jsonString = JSON.stringify(object, null, 4);
      fs.writeFile(path, jsonString, function (err) {
          if (err) {
              reject(err);
          } else {
              resolve()
          }
      });
  });
}
