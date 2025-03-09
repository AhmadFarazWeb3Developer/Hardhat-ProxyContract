require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    ganache: {
      url: "http://127.0.0.1:8545", // Ganache RPC URL
      accounts: [
        "0x9728b4c2c627242d70b37cacdec37df264f4c98be20c4f9e1c8123ad5af3b695",
      ],
    },
  },
};
