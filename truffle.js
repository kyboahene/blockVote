const path = require('path')
const HDWalltetProvider = require('truffle-hdwallet-provider')
require('dotenv').config()

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
    ropsten: {
      provider: () =>
        new HDWalltetProvider(
          process.env.MNEMONIC,
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
        ),
      network_id: '4',
    },
  },
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  compilers: {
    solc: {
      version: '0.5.0', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200,
        },
        //    evmVersion: "byzantium"
      },
    },
  },
}
