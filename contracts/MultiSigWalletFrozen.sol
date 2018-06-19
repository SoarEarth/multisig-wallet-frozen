pragma solidity ^0.4.15;

import "./gnosis/MultiSigWallet.sol";

/// @title Multisignature frozen wallet - Allows multiple parties to agree on transactions before execution after lockup period
 
contract MultiSigWalletFrozen is MultiSigWallet {

    uint256 public releaseTime;

    constructor(address[] _owners, uint _required, uint _releaseTime) 
    public 
    MultiSigWallet(_owners, _required)
    {
        releaseTime = _releaseTime;
    }

    /// overriding MultiSigWallet#submitTransaction
    /// - To frozen until releaseTime.
    ///
    /// @dev Allows an owner to submit and confirm a transaction.
    /// @param destination Transaction target address.
    /// @param value Transaction ether value.
    /// @param data Transaction data payload.
    /// @return Returns transaction ID.
    function submitTransaction(address destination, uint value, bytes data)
    public
    returns (uint transactionId)
    {
        // solium-disable-next-line security/no-block-members
        require(block.timestamp >= releaseTime);
        return super.submitTransaction(destination, value, data);
    }
    
    
}