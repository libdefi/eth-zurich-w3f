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
    "function mint(bool _isNight) external"
  ];

  let nftAddress = "0ef77b8c3A3F82fe88833f801d3A67468C1ebC08";

  const [signer] = await hre.ethers.getSigners();
  const nft = new Contract(nftAddress as string, NFT_ABI, signer);

  let tx = await nft.mint(false);
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
