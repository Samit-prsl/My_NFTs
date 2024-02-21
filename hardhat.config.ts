import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import dotenv from "dotenv"

dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork : "sepolia",
  networks : {
    sepolia : {
      url : process.env.ALCHEMY_URI,
      accounts : [process.env.METAMASK_PRIVATE_KEY!]
    },
    mumbai : {
      url : process.env.TESTNET_RPC,
      accounts : [process.env.POLYGON_PRIVATE_KEY!]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
  },
};

export default config;
