pragma solidity ^0.4.15;

import "./gnosis/MultiSigWallet.sol";

/**
 * @title SkymapToken is extended ERC827 with ability to distribute token when is paused
 */
 
contract MultiSigWalletFrozen is MultiSigWallet {

    constructor(address[] _owners, uint _required) 
    public 
    MultiSigWallet(_owners, _required)
    {
    }
    
    
}