// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HammerAndApesContract is ERC1155Pausable, Ownable {
    uint256 public constant HAMMER_TYPE = 0;
    uint256 public tokenId;
    uint256 public constant APES_TYPE = 1;
    uint256 public constant APES_PRICE = 100 * 10**18 ; // 100 Ropsten tokens

    mapping(address => bool) public hasHammer;
    mapping(address => bool) public hasOpenApes;

    IERC20 RopstamToken;

    constructor(IERC20 _ropstamToken) ERC1155("ipfs://" ) {
        // Minting 100 Hammers and sending them to the contract deployer
        _mint(msg.sender, HAMMER_TYPE, 100, "");

        RopstamToken = _ropstamToken;
    }

    function buyOpenApes(uint256 _amount) external  {
        require(_amount >= APES_PRICE, "Insufficient payment for Open Apes");
        require(!hasOpenApes[msg.sender], "You already own Open Apes");
        require(!hasHammer[msg.sender], "You already own a Hammer");

        uint256 _tokenId = tokenId;
        hasOpenApes[msg.sender] = true;

        RopstamToken.transferFrom(msg.sender,address(this),_amount);
        // Minting 1 Open Apes and sending it to the buyer
        _mint(msg.sender, APES_TYPE, _tokenId, "");

        tokenId++;
        if (_amount > APES_PRICE) {

            uint256 remAmount = _amount - APES_PRICE;
            // Refund excess payment
            RopstamToken.transfer(msg.sender,remAmount);
        }
    }

    function withdraw() external onlyOwner {
        uint256 balance = RopstamToken.balanceOf(address(this));
        require(balance > 0, "No balance to withdraw");
        //Withdraw amount to the owner
        RopstamToken.transfer(msg.sender,balance);
    }

    function addOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        hasOpenApes[newOwner] = false;
        hasHammer[newOwner] = false;
        transferOwnership(newOwner);
    }

    // ERC1155 token URI function to return a random URI for both tokens
    function uri(uint256) public pure override returns (string memory) {
        return "ipfs://QmT7Dme4yqynrHBJUz7GLS8nr5KPeE8zg3TLBTx1YfJz5X";
    }
}
