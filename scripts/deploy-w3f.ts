/* eslint-disable @typescript-eslint/naming-convention */
import hre from "hardhat";
import { GelatoOpsSDK, isGelatoOpsSupported, TaskTransaction, Web3Function } from "@gelatonetwork/ops-sdk";
import { Web3FunctionBuilder } from "@gelatonetwork/web3-functions-sdk/builder";

async function main() {
  const chainId = hre.network.config.chainId as number;
 
  const [signer] = await hre.ethers.getSigners();
  // const gelatoOps = new GelatoOpsSDK(chainId, signer);
  // const dedicatedMsgSender = await gelatoOps.getDedicatedMsgSender();
  // console.log(`Dedicated msg.sender: ${dedicatedMsgSender.address}`);



  // // Deploy Web3Function on IPFS
  // console.log("Deploying Web3Function on IPFS...");
  // const web3Function = "./web3-functions/open-ai-nft/index.ts";
  // const cid = await Web3FunctionBuilder.deploy(web3Function);
  // console.log(`Web3Function IPFS CID: ${cid}`);

  // // Deploy Web3Functions secrets
  // const secretsManager = new Web3Function(chainId, signer).secrets;
  // await secretsManager.set({
  //   OPEN_AI_API_KEY: process.env.SECRETS_OPEN_AI_API_KEY as string,
  //   NFT_STORAGE_API_KEY: process.env.SECRETS_NFT_STORAGE_API_KEY as string,
  // });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
