/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('dotenv').config({path:__dirname+'/.env'})
 require("@nomiclabs/hardhat-waffle");
 require("@nomiclabs/hardhat-etherscan");
 require("@nomiclabs/hardhat-ethers");
 require('hardhat-contract-sizer');
 require('hardhat-abi-exporter');

 const {
  ALCHEMY_RINKEBY_API_KEY,
  ALCHEMY_MAINNET_API_KEY,
  CONTRACT_OWNER_PRIVATE_KEY,
  ALCHEMY_GOERLI_API_KEY,
  ETHERSCAN_API_KEY
} = process.env;

const accounts = require("./hardhatAccountsList2k.js");
const accountsList = accounts.accountsList

 
module.exports = {
  solidity: "0.8.13",
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
      accounts: accountsList,
      gas: 10000000,  // tx gas limit
      blockGasLimit: 15000000,
      gasPrice: 20000000000,
      initialBaseFeePerGas: 0,
  },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_RINKEBY_API_KEY}`,
      accounts: [CONTRACT_OWNER_PRIVATE_KEY]
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_MAINNET_API_KEY}`,
      accounts: [CONTRACT_OWNER_PRIVATE_KEY]
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_GOERLI_API_KEY}`,
      accounts: [CONTRACT_OWNER_PRIVATE_KEY]
    }
  },
  mocha: {
    timeout: 20000
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    only: [],
  },
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    flat: true,
    only: [':Twinz$'],
    spacing: 2,
    pretty: true
  }
};