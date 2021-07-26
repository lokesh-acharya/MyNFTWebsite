/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { REACT_APP_ALCHEMY_KEY, REACT_APP_PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: REACT_APP_ALCHEMY_KEY,
         accounts: [`0x${REACT_APP_PRIVATE_KEY}`]
      }
   },
}