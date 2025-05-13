const { ethers, upgrades } = require("hardhat");

async function main() {
  const PROXY_CONTRACT_ADDRESS = "0x1613beB3B2C4f22Ee086B2b38C1476A3cE7f78E8";

  const BoxV2 = await ethers.getContractFactory("BoxV2");
  const upgradedProxy = await upgrades.upgradeProxy(
    PROXY_CONTRACT_ADDRESS,
    BoxV2
  );
  await upgradedProxy.waitForDeployment();

  console.log("Incrementing value...");
  const tx = await upgradedProxy.doubleValue();
  await tx.wait();

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    PROXY_CONTRACT_ADDRESS
  );
  console.log(
    "Upgraded implementation contract address:",
    implementationAddress
  );

  // Attach to the proxy contract
  const box = await BoxV2.attach(PROXY_CONTRACT_ADDRESS);

  // ✅ Fetch the stored value correctly
  const storedValue = await box.getValue();
  console.log("✅ Stored Value in Proxy Contract:", storedValue.toString());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
