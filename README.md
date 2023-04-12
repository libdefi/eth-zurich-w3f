# EthZurich Gelato Bots NFT

## Summary

NFT powered by Open AI & Web3 functions:
- Each uer can mint 1 NFT
- A Web3 function is listening to every new mint and generate a new art using Open Ai (Dall-E)
- The NFT pic is published on IPFS and revealed on-chain via Gelato Automate

## Demo
- Polygon:
  - Mint website: https://eth-zurich-nft.web.app/ 
  - Smart Contract: https://polygonscan.com/address/0x5041c60C75633F29DEb2AED79cB0A9ed79202415
  - Web3 Function: https://beta.app.gelato.network/task/0x6e9ee6b129c9f58dd46c77808c9451c18bc80b9bd1ef87313e8c37ae22639cbb?chainId=137
  - Open Sea NFTs: https://opensea.io/collection/eth-zurich-gelato-bots

## How to run

1. Install project dependencies:
```
yarn install
```

2. Create a `.env` file with your private config:
```
cp .env.example .env
```
You will need to create free accounts and get Api Keys from [OpenAI](https://platform.openai.com/) and [Nft.Storage](https://nft.storage/)

3. Test the Open AI NFT web3 function on polygon:
```
npx w3f test web3-functions/open-ai-nft/index.ts --show-logs --user-args=nftAddress:0x5041c60C75633F29DEb2AED79cB0A9ed79202415
```

## Deploy your smart contract and web3 function
```
yarn run deploy --network goerli
```

## Verify
```
npx hardhat verify CONTRACT_ADDRESS DEDICATED_MSG_SENDER --network goerli
```
```ts
npx hardhat node --network hardhat 
```

```ts
npx hardhat run  scripts/deploy-contract.ts
```