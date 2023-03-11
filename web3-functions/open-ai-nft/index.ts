/* eslint-disable @typescript-eslint/naming-convention */
import { Web3Function, Web3FunctionContext } from "@gelatonetwork/web3-functions-sdk";
import { Contract, constants, ethers, BigNumber } from "ethers";
import { Configuration, OpenAIApi } from "openai";
import { NFTStorage, File } from "nft.storage";
import Chance from "chance";
import axios, { AxiosError } from "axios";

const MAX_RANGE = 100;
const MAX_REQUESTS = 10;
const NFT_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "function revealNft(uint256 tokenId, string memory tokenURI) external",
  "function tokenURI(uint256 tokenId) public view returns (string memory) ",
  "function tokenIds() public view returns(uint256)"
];
const NOT_REVEALED_URI = "ipfs://bafyreicwi7sbomz7lu5jozgeghclhptilbvvltpxt3hbpyazz5zxvqh62m/metadata.json";


function generateNftProperties(seed: string) {
  const chance = new Chance(seed);
  const place = chance.weighted(["big city", "beach marina", "ski resort"], [60, 20, 20]);
  const outfit = chance.weighted(["none", "golden crown","silver medal"], [20, 20,60]);
  const accessory = chance.weighted(["ethereum", "bitcoin","usdc"], [80, 10,10]);
  const description = `A cute robot ${
    outfit !== "none" ? `, wearing a ${outfit}` : ""
  }, eating an icecream with Dubai background  at sunset in a cyberpunk art, 3D, video game, and pastel salmon colors`;
  return {
    description,
    attributes: [
      { trait_type: "Place", value: place },
      { trait_type: "Outfit", value: outfit },
      { trait_type: "Accessory", value: accessory },
    ],
  };
}

Web3Function.onRun(async (context: Web3FunctionContext) => {
  const { userArgs, storage, secrets, provider } = context;

  const nftAddress = userArgs.nftAddress;
  if (!nftAddress) throw new Error("Missing userArgs.nftAddress");
  const nft = new Contract(nftAddress as string, NFT_ABI, provider);



  const lastTokenId = parseInt((await storage.get("lastTokenId")) ?? "0");


  let currentTokenId = await nft.tokenIds()


  console.log("hola")


 console.log(BigNumber.from(lastTokenId))
  
  if ( currentTokenId.eq(BigNumber.from(lastTokenId))) {
    return { canExec:false, message:'No New Tokens'}
  }


  let tokenId = lastTokenId+1;

  // Generate NFT properties
;
  const nftProps = generateNftProperties(`${currentTokenId}_${lastTokenId}`);
  console.log(`Open AI prompt: ${nftProps.description}`);

  // Generate NFT image with OpenAI (Dall-E)
  const openAiApiKey = await secrets.get("OPEN_AI_API_KEY");
  if (!openAiApiKey) throw new Error("Missing secrets.OPEN_AI_API_KEY");
  const openai = new OpenAIApi(new Configuration({ apiKey: openAiApiKey }));
  let imageUrl: string;
  try {
    const response = await openai.createImage({
      prompt: nftProps.description,
      size: "512x512",
    });
    imageUrl = response.data.data[0].url as string;
    console.log(`Open AI generated image: ${imageUrl}`);
  } catch (_err) {
    const openAiError = _err as AxiosError;
    const errrorMessage = openAiError.response
      ? `${openAiError.response.status}: ${openAiError.response.data}`
      : openAiError.message;
    return { canExec: false, message: `OpenAI error: ${errrorMessage}` };
  }

  // Publish NFT metadata on IPFS
  const imageBlob = (await axios.get(imageUrl, { responseType: "blob" })).data;
  const nftStorageApiKey = await secrets.get("NFT_STORAGE_API_KEY");
  if (!nftStorageApiKey) throw new Error("Missing secrets.NFT_STORAGE_API_KEY");
  //const client = new NFTStorage({ token: nftStorageApiKey });
  const imageFile = new File([imageBlob], `gelato_bot_${tokenId}.png`, { type: "image/png" });

  console.log(imageFile)
  // const metadata = await client.store({
  //   name: `GelatoBot #${tokenId}`,
  //   description: nftProps.description,
  //   image: imageFile,
  //   attributes: nftProps.attributes,
  //   collection: { name: "GelatoBots", family: "gelatobots" },
  // });
 // console.log("IPFS Metadata:", metadata.url);

  await storage.set("lastTokenId", tokenId.toString());
  return {
    canExec: true,
    callData: nft.interface.encodeFunctionData("revealNft", [tokenId, 'metadata.url']),
  };
});
