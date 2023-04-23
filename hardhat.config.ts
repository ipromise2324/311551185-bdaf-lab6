import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
//const { API_URL, PRIVATE_KEY } = process.env;
dotenv.config();
//AN8B9SJUTNCEJHVZYI8RINWUPGRGSYHQFY
const ETHERSCAN_API_KEY = "AN8B9SJUTNCEJHVZYI8RINWUPGRGSYHQFY";
const GOERLI_URL="https://eth-goerli.g.alchemy.com/v2/daGpBqVMWmMAarCYuQfbclMOOQ1imQkZ";
const GOERLI_PRIVATE_KEY = "231e84652e82cc102a03c4ccea87e7815f6c0fd5da72b02b3477add1a5948c6e";
const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    goerli: {
      url: GOERLI_URL || "",
      accounts: GOERLI_PRIVATE_KEY ? [`0x${GOERLI_PRIVATE_KEY}`] : [],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY
  }
};

export default config;

