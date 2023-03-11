import { HardhatUserConfig } from "hardhat/config";

// PLUGINS
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
// import 'hardhat-deploy';

require('hardhat-contract-sizer');

// Process Env Variables
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ALCHEMY_ID = process.env.ALCHEMY_ID;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;



const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY ?? "",
      polygon: POLYGONSCAN_API_KEY ?? "",
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      forking: {
        url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_ID}`
       // blockNumber: 7704180
       
      
      },
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 31337,
    },
    goerli: {
      chainId: 5,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_ID}`,
    },

    polygon: {
      chainId: 137,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`,
    },
    mumbai: {
      url:`https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_ID}`,
      gasPrice: 1000000000,
      chainId:80001,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },

  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    ],
  },
};

export default config;
