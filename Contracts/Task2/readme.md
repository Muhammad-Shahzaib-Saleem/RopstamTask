# HammerAndApesContract Smart Contract

The `HammerAndApesContract` is an ERC1155 token contract implemented on the Ethereum blockchain. It allows users to buy and own Hammers and Open Apes tokens using Ropstam tokens.

## Contract Functions:

1. `constructor(IERC20 _ropstamToken)`

   The constructor function is executed when the contract is deployed. It mints 100 Hammers (HAMMER_TYPE) and assigns them to the contract deployer. Additionally, it sets the RopstamToken address, which is the ERC20 token used as the payment method for Open Apes.

2. `buyOpenApes(uint256 _amount)`

   This function allows users to purchase Open Apes tokens by sending Ropstam tokens to the contract. To buy Open Apes, users must send at least the specified APES_PRICE (100 Ropstam tokens). Upon successful purchase, the contract mints one Open Apes token (APES_TYPE) and assigns it to the buyer. Each address can only purchase one Open Apes token, and they must not already own an Open Apes or a Hammer. If the buyer sends an amount greater than the APES_PRICE, the excess payment is refunded.

3. `withdraw()`

   This function allows the contract owner to withdraw any remaining Ropstam tokens held in the contract. The contract owner can withdraw the funds to their own address.

4. `addOwner(address newOwner)`

   This function allows the contract owner to add a new owner to the contract by transferring ownership to the specified address. Additionally, this function resets the ownership status of the new owner for both Hammers and Open Apes. The new owner will be able to buy and own Hammers and Open Apes after the ownership transfer.

5. `uri(uint256)`

   This function is a standard ERC1155 token URI function that returns the base URI for the token metadata. It points to an IPFS URL that holds the metadata for both Hammers and Open Apes tokens.

## Contract Variables:

1. `HAMMER_TYPE`

   This constant variable represents the token type identifier for Hammers. The value is set to 0.

2. `tokenId`

   This variable keeps track of the next `_tokenId` to be assigned when a new Open Apes token is minted. Each new Open Apes token will be assigned a unique identifier starting from 0 and incrementing by 1 for each subsequent minting.

3. `APES_TYPE`

   This constant variable represents the token type identifier for Open Apes. The value is set to 1.

4. `APES_PRICE`

   This constant variable defines the price in Ropstam tokens for purchasing one Open Apes token. Users need to send at least this amount to buy an Open Apes token.

5. `hasHammer`

   This mapping keeps track of whether a specific address already owns a Hammer. If an address owns a Hammer, the value will be set to `true`; otherwise, it will be `false`.

6. `hasOpenApes`

   This mapping keeps track of whether a specific address already owns an Open Apes token. If an address owns an Open Apes token, the value will be set to `true`; otherwise, it will be `false`.

7. `RopstamToken`

   This variable stores the address of the ERC20 Ropstam token contract (`IERC20` interface). It is used to interact with the Ropstam token contract and transfer tokens during the purchase of Open Apes.

## Deployment and Usage

You can deploy this contract to the Ethereum network using Remix, Truffle, or any other Ethereum development framework. Make sure to provide the address of the Ropstam ERC20 token when deploying the contract.

After deployment, the contract owner can use the functions `buyOpenApes()` to allow users to purchase Open Apes tokens using Ropstam tokens. Additionally, the owner can withdraw any remaining Ropstam tokens using the `withdraw()` function.

Please note that deploying smart contracts on the Ethereum mainnet or testnets incurs gas fees, and you should only deploy contracts after thorough testing on local or test networks.

For further documentation and usage examples, consider adding deployment instructions, testing scenarios, and explanations of contract variables and modifiers in the GitHub repository along with the contract code.

## Disclaimer

Smart contract development involves risks, and it is crucial to conduct a thorough security audit before deploying any contract to the blockchain. Additionally, consider adding error handling and access control mechanisms to enhance the contract's security and reliability.
