pragma solidity ^0.4.15;

import "../../node_modules/openzeppelin-solidity/contracts/token/ERC827/ERC827Token.sol";
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";

/**
 * @title SkymapTokenMock is a copy of SkymapToken for tests from the repo
 * https://github.com/SoarEarth/skymap-token
 */
 
contract SkymapTokenMock is ERC827Token, PausableToken {

    string public constant symbol = "SKYM";
    string public constant name = "Skymap";
    uint8 public constant decimals = 18;
    uint public INITIAL_SUPPLY = 510000000 * (uint(10) ** decimals);

    constructor(address beneficier) public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[beneficier] = INITIAL_SUPPLY;
        emit Transfer(0x0, beneficier, INITIAL_SUPPLY);
    }
    
    /**
   * @dev Override renounceOwnership to make sure that token will be unpaused
   *    when ownership will be renounced
   */
    function renounceOwnership() public onlyOwner whenNotPaused {
        super.renounceOwnership();
    }

    /**
   * @dev Allow to distribute pre-approved tokens from one address to another 
   *      when token is paused
   * @param _from address The address which you want to send tokens from
   * @param _to address The address which you want to transfer to
   * @param _value uint256 the amount of tokens to be transferred
   */
    function distributeFrom (
        address _from,
        address _to,
        uint256 _value
    )
    public whenPaused
    returns (bool)
    {
        require(_to != address(0));
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]);

        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }
}