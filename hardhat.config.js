require("@nomiclabs/hardhat-waffle");
const fs = require("fs") ;
const privateKey = fs.readFileSync(".secret").toString();



module.exports = {
  networks : {
    hardhat : {
      chainId: 1337
    },
    mumbai : {
      url : "https://polygon-mumbai.g.alchemy.com/v2/SnPPdTpTEgTOZhzQrBdcJ3wx8b18bGtk",
      accounts: [privateKey]
    },
    mainnet: {
      url : "https://polygon-mainnet.infura.io/v3/be88e1ca8daa4255a1491c5eeed5713a",
      accounts: [privateKey]
    }
  },
  solidity: "0.8.4",
};
