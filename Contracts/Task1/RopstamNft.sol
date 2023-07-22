// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Ropstam ERC721 NFT Contract
contract RopstamNFT is  ERC721 {
    // using Counters for Counters.Counter;
    // Counters.Counter private _tokenIdCounter;

    uint256 public tokenId;
    address public _owner;

    mapping(uint256 => uint256) public nftPrices;

    // Ropstam ERC20 Token
    IERC20 public ropstamToken;

     modifier onlyOwner(){
        require(_owner==msg.sender,"Only owner can perform this function");
        _;
    }

    constructor(string memory _name, string memory _symbol, address _ropstamTokenAddress) ERC721(_name, _symbol) {
        ropstamToken = IERC20(_ropstamTokenAddress);
        _owner = msg.sender;
    }

    // Set the price of an NFT by the owner
    function setNFTPrice(uint256 _tokenId, uint256 _price) external onlyOwner {
        nftPrices[_tokenId] = _price;
    }

    // Get the price of an NFT
    function getNFTPrice(uint256 _tokenId) external view returns (uint256) {
        return nftPrices[_tokenId];
    }

    // Function to mint a new NFT (Only the owner can call this function)
    function mintNFT() external onlyOwner {
        uint256 _tokenId = tokenId;
        _mint(address(this), _tokenId);
        tokenId++;
       
    }

    //Function to transfer the NFT in Contract before

    // Function to buy the NFT using Ropstam tokens
    function buyNFTWithRopstamToken(uint256 _tokenId) external {
        uint256 nftPrice = nftPrices[_tokenId];
        require(nftPrice > 0, "NFT not available for purchase");
        require(ropstamToken.balanceOf(_msgSender()) >= nftPrice, "Insufficient Ropstam tokens");

        ropstamToken.transferFrom(msg.sender, address(this), nftPrice);
        _transfer(address(this), msg.sender, _tokenId);
    }
}
