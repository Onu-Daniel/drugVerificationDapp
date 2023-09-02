require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  etherscan: {
    apiKey: process.env.API_KEY,
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URl,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};
