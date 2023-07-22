# RopstamToken Smart Contract

The `RopstamToken` is an ERC20 standard token implemented on the Ethereum blockchain. It allows users to buy, transfer, mint, and burn tokens. The contract also includes a deflationary mechanism that burns a percentage of tokens with each transfer.

## Contract Functions:

1. `buyTokens()`

   This function allows users to purchase Ropstam tokens by sending Ether to the contract. The amount of tokens purchased is calculated based on the value of Ether sent and the TOKEN_PRICE (100 Wei). The purchased tokens are then transferred from the contract owner to the buyer.

2. `mint(uint256 _amount)`

   This function is accessible only to the contract owner. It allows the owner to create new Ropstam tokens by minting them directly into their own address. This function is useful for increasing the token supply.

3. `burn(uint256 _amount)`

   Similar to the `mint()` function, this function is also accessible only to the contract owner. It allows the owner to burn (destroy) Ropstam tokens from their own address, reducing the token supply. Burning tokens can be used to implement deflationary mechanisms.

4. `_transfer(address sender, address recipient, uint256 amount)`

   This internal function is an override of the ERC20 `_transfer` function. It handles the transfer of Ropstam tokens between addresses. However, it introduces a deflationary mechanism by deducting a percentage (TRANSACTION_FEE_PERCENTAGE) of tokens from the transferred amount and sending them to the DEFLATIONARY_ADDRESS. The remaining (net) amount is transferred to the recipient address.

5. `modifier onlyOwner()`

   This is a custom modifier used in the contract to restrict access to certain functions. It ensures that only the contract owner can execute functions with this modifier. If any other address tries to access a function with this modifier, the transaction will be reverted.

## Contract Variables:

1. `INITIAL_SUPPLY`

   This constant variable holds the initial total supply of Ropstam tokens, which is 1,000,000 tokens with 18 decimals. The initial supply is minted to the contract deployer's address when the contract is deployed.

2. `TOKEN_PRICE`

   This constant variable defines the price of one Ropstam token in Wei. It is used to calculate the number of tokens a user receives when they buy tokens using Ether.

3. `owner`

   This variable stores the address of the contract owner, who has special privileges such as minting and burning tokens, and performing administrative actions.

4. `DEFLATIONARY_ADDRESS`

   This constant variable represents the address where a portion of tokens (transaction fees) will be sent during each transfer to implement the deflationary mechanism.

5. `TRANSACTION_FEE_PERCENTAGE`

   This constant variable defines the percentage of tokens (2%) deducted from the transferred amount as a transaction fee during each transfer. The deducted tokens are sent to the DEFLATIONARY_ADDRESS.

## Deployment and Usage

You can deploy this contract to the Ethereum network using Remix, Truffle, or any other Ethereum development framework. After deployment, the contract owner should manage the token supply by minting or burning tokens as needed.

Please note that deploying smart contracts on the Ethereum mainnet or testnets incurs gas fees, and you should only deploy contracts after thorough testing on local or test networks.

For further documentation and usage examples, consider adding deployment instructions, testing scenarios, and explanations of contract variables and modifiers in the GitHub repository along with the contract code.



# RopstamNFT Smart Contract

The `RopstamNFT` is an ERC721 standard non-fungible token (NFT) contract implemented on the Ethereum blockchain. It allows users to create, set prices for, and buy NFTs using Ropstam tokens.

## Contract Functions:

1. `setNFTPrice(uint256 _tokenId, uint256 _price)`

   This function allows the contract owner to set the price for a specific NFT identified by its `_tokenId`. Only the contract owner can call this function. By setting a price for an NFT, the owner enables it to be available for purchase using Ropstam tokens.

2. `getNFTPrice(uint256 _tokenId)`

   This function allows anyone to query the price set for a specific NFT identified by its `_tokenId`. Users can use this function to check the price of an NFT before attempting to purchase it.

3. `mintNFT()`

   This function allows the contract owner to mint a new NFT. The newly minted NFT is assigned a unique `_tokenId` and is owned by the contract itself (`address(this)`). Minting an NFT essentially creates it and makes it available for sale.

4. `buyNFTWithRopstamToken(uint256 _tokenId)`

   This function allows users to purchase an NFT using Ropstam tokens. Users must specify the `_tokenId` of the NFT they want to purchase. The function first checks if the NFT is available for purchase (i.e., if a price has been set for it). If the NFT is available and the buyer has sufficient Ropstam tokens, the contract transfers the specified amount of Ropstam tokens from the buyer to the contract, and then the NFT is transferred from the contract to the buyer's address.

## Contract Variables:

1. `tokenId`

   This variable keeps track of the next `_tokenId` to be assigned when a new NFT is minted. Each new NFT will be assigned a unique identifier starting from 0 and incrementing by 1 for each subsequent minting.

2. `_owner`

   This variable stores the address of the contract owner, who has special privileges such as minting NFTs, setting prices, and performing administrative actions.

3. `nftPrices`

   This mapping relates each NFT `_tokenId` to its respective price set by the contract owner. It allows users to query the price of a specific NFT before attempting to buy it.

4. `ropstamToken`

   This variable is an interface of the ERC20 Ropstam token contract (`IERC20` interface). It is used to interact with the Ropstam token contract and transfer tokens during NFT purchases.

## Deployment and Usage

You can deploy this contract to the Ethereum network using Remix, Truffle, or any other Ethereum development framework. Make sure to provide the address of the Ropstam ERC20 token when deploying the contract.

After deployment, the contract owner should set prices for NFTs using the `setNFTPrice()` function. Once the prices are set, users can use Ropstam tokens to buy the NFTs they desire using the `buyNFTWithRopstamToken()` function.

Please note that deploying smart contracts on the Ethereum mainnet or testnets incurs gas fees, and you should only deploy contracts after thorough testing on local or test networks.

For further documentation and usage examples, consider adding deployment instructions, testing scenarios, and explanations of contract variables and modifiers in the GitHub repository along with the contract code.

## Disclaimer

Smart contract development involves risks, and it is crucial to conduct a thorough security audit before deploying any contract to the blockchain. Additionally, consider adding error handling and access control mechanisms to enhance the contract's security and reliability.
