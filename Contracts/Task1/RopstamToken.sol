// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



// Ropstam ERC20 Token
contract RopstamToken is  ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1,000,000 tokens with 18 decimals
    uint256 public constant TOKEN_PRICE = 100 wei; // Price to buy one Ropstam token in Wei
    address public owner;
  

    // Deflationary address (burn address)
    address public constant DEFLATIONARY_ADDRESS = 0x000000000000000000000000000000000000dEaD;

   
   

    // Transaction fee in percentage (e.g., 2%)
    uint256 public constant TRANSACTION_FEE_PERCENTAGE = 2;


    modifier onlyOwner(){
        require(owner==msg.sender,"Only owner can perform this function");
        _;
    }
 

    constructor() ERC20("Ropstam", "RPT") {
        _mint(msg.sender, INITIAL_SUPPLY);
        owner = msg.sender;

    }

   

  

    // Buy Ropstam tokens
    function buyTokens() external payable {
        uint256 amount = msg.value * (10**18) / TOKEN_PRICE;
        require(amount > 0, "Insufficient Ether provided");

        _transfer(owner, msg.sender, amount);
    }


    function _transfer(address sender, address recipient, uint256 amount) internal virtual override {
        uint256 feeAmount = (amount * TRANSACTION_FEE_PERCENTAGE) / 100;
        uint256 netAmount = amount - feeAmount;

        require(netAmount > 0, "Transfer amount too small");

        super._transfer(sender, recipient, netAmount);
        super._transfer(sender, DEFLATIONARY_ADDRESS, feeAmount);
    }
 

    // Function to mint new tokens (Only the owner can call this function)
    function mint(uint256 _amount) external onlyOwner {
        _mint(_msgSender(), _amount);
    }

    // Function to burn tokens (Only the owner can call this function)
    function burn(uint256 _amount) external onlyOwner {
        _burn(_msgSender(), _amount);
    }

   

  
}
