// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract HammerAndApesContract is ERC20, ERC721, Ownable, AccessControl,ERC721URIStorage {
    // Address of the NFT token owner
    address public nftOwner;

    // Price of the NFT in Ropsten tokens
    uint256 public nftPrice = 100 * 10**18; // 100 Ropsten tokens

    // IPFS URLs for token URIs
    string private hammerTokenURI;
    string private apesTokenURI;

    // Event to notify when a new NFT is purchased
    event NFTPurchased(address indexed buyer, uint256 indexed tokenId);

    constructor(
        string memory _hammerTokenURI,
        string memory _apesTokenURI,
        address[] memory _owners
    ) ERC20("Hammer", "HAMMER") ERC721("Open Apes", "APES") {
        hammerTokenURI = _hammerTokenURI;
        apesTokenURI = _apesTokenURI;

        // Assign the initial contract owners during deployment
        for (uint256 i = 0; i < _owners.length; i++) {
            require(_owners[i] != address(0), "Zero address not allowed");
            _addOwner(_owners[i]);
        }
    }

    modifier onlyOwner() {
        require(isOwner(), "Caller is not the owner");
        _;
    }

    function _addOwner(address newOwner) private {
        _setupRole(DEFAULT_ADMIN_ROLE, newOwner);
    }

    function isOwner() internal view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function purchaseNFT() external payable {
        require(nftOwner == address(0), "NFT already purchased");
        require(msg.sender != address(0), "Zero address not allowed");
        require(balanceOf(msg.sender) > 0, "Must own Hammer to purchase NFT");
        require(msg.value >= nftPrice, "Insufficient funds to purchase NFT");

        // Transfer ownership of NFT to the buyer
        nftOwner = msg.sender;
        uint256 tokenId = totalSupply() + 1;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, apesTokenURI);

        // Emit event
        emit NFTPurchased(msg.sender, tokenId);
    }

    function withdraw() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "Contract has no balance");

         address[] memory owners = getRoleMembers(DEFAULT_ADMIN_ROLE);
        for (uint256 i = 0; i < owners.length; i++) {
            address owner = owners[i];
            require(owner != address(0), "Invalid owner address");
            payable(owner).transfer(contractBalance);
        }

        // Transfer the contract balance to the contract owners
        for (uint256 i = 0; i < getRoleMemberCount(DEFAULT_ADMIN_ROLE); i++) {
            address owner = getRoleMember(DEFAULT_ADMIN_ROLE, i);
            require(owner != address(0), "Invalid owner address");
            payable(owner).transfer(contractBalance);
        }
    }

    function getHammerTokenURI() external view returns (string memory) {
        return hammerTokenURI;
    }

    function getApesTokenURI() external view returns (string memory) {
        return apesTokenURI;
    }

    function setApesTokenURI(string memory newTokenURI) external onlyOwner {
        apesTokenURI = newTokenURI;
    }

      function setApesTokenURI(string memory newTokenURI) external onlyOwner {
        apesTokenURI = newTokenURI;
    }

    
}
