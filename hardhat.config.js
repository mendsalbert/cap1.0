/* hardhat.config.js */
require("@nomiclabs/hardhat-ethers");
const fs = require("fs");
const privateKey = fs.readFileSync("secret.txt").toString();
const projectId = "8b7ba5517c414450a93ec7334975a7fe";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    //  unused configuration commented out for no
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
