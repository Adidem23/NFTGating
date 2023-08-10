/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomicfoundation/hardhat-toolbox");


const ALCHEMY_API_KEY = "9ZTUF-iOonsAf71cbiLRRbvoKG9EhSSF"; 
const PRIVATE_KEY = "5ad7f7823ac4a9518b1ce47b007c63c150bc31382d6878d48cce4abb2cc707ef"; 

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};
