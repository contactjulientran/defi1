const HDWalletProvider = require("truffle-hdwallet-provider");
const path = require('path');

require('dotenv').config()  // Store environment-specific variable from '.env' to process.env

module.exports = {
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    compilers: {
        solc: {
            version: "^0.6",
        }
    },
    networks: {
        development: {
            provider: () =>
                new HDWalletProvider(process.env.MNENOMIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
            network_id: "*" // Any network (default: none)
        },
    }
}