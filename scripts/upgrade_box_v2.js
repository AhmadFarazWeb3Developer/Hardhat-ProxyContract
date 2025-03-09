const { ethers, upgrades } = require("hardhat");
const PROXY_CONTRACT_ADDRESS = "0x41491F1A6C2531EE2c165dE01404b5e9c68b1028";

async function main() {
  // 1. Get the BoxV2 contract factory
  const BoxV2 = await ethers.getContractFactory("BoxV2");

  // 2. Upgrade the proxy and get the instance
  const upgradedProxy = await upgrades.upgradeProxy(
    PROXY_CONTRACT_ADDRESS,
    BoxV2
  );
  await upgradedProxy.waitForDeployment();

  console.log("Incrementing value...");
  const tx = await upgradedProxy.increamentValue();
  await tx.wait();

  const newValue = await upgradedProxy.value();
  console.log("Value after increment:", newValue.toString());

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    PROXY_CONTRACT_ADDRESS
  );
  console.log(
    "Upgraded implementation contract address:",
    implementationAddress
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
