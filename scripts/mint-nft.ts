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

  let nftAddress = "0xFA342844aE9039E0811bA3BD62BF0Ffd04c97e28"; //0xe121858e944c59adac681df6c62d13c4b27d8946 //0x288a462c1d2403b86ed2c2f6c51d3b41a794dc54
// https://polygonscan.com/address/0xd47c74228038e8542a38e3e7fb1f4a44121ee14e
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
