/* eslint-disable @typescript-eslint/naming-convention */
import hre from "hardhat";
import { GelatoOpsSDK, isGelatoOpsSupported, TaskTransaction, Web3Function } from "@gelatonetwork/ops-sdk";
import { Contract } from "ethers";

async function main() {
  const chainId = hre.network.config.chainId as number;


  // Init GelatoOpsSDK
  const NFT_ABI = [
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
    "function revealNft(uint256 tokenId, string memory tokenURI) external",
    "function tokenURI(uint256 tokenId) public view returns (string memory) ",
    "function tokenIds() public view returns(uint256)",
    "function mint() external"
  ];

  let nftAddress = "0x6ae15a440df1319dd1fbb02179ebdcc38209545b";

  const [signer] = await hre.ethers.getSigners();
  const nft = new Contract(nftAddress as string, NFT_ABI, signer);

  let tx = await nft.mint();
  await tx.wait()

 let tokenId = await nft.tokenIds()
 console.log(tokenId.toString())


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
