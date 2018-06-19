pragma solidity ^0.4.15;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";

/// @title Frozen wallet
 
contract WalletFrozen is TokenTimelock {

    constructor(ERC20Basic _token, address _beneficiary, uint256 _releaseTime) 
    public 
    TokenTimelock(_token, _beneficiary, _releaseTime)
    {
    }
}