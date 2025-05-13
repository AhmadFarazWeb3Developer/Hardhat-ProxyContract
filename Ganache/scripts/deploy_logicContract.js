const { ethers, upgrades } = require("hardhat");

async function main() {
  const BoxV1 = await ethers.getContractFactory("BoxV1");
  console.log("Deploying BoxV1...");

  // Deploy proxy contract
  const proxyContract = await upgrades.deployProxy(BoxV1, [42], {
    initializer: "setValue",
  });

  await proxyContract.waitForDeployment();

  // Get the proxy contract address
  const proxyContractAddress = await proxyContract.getAddress();

  // Get the actual implementation (logic contract) address
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyContractAddress
  );

  // Get the admin contract address (OpenZeppelin's internal contract)
  const adminAddress = await upgrades.erc1967.getAdminAddress(
    proxyContractAddress
  );

  console.log("✅ Proxy contract address:", proxyContractAddress);
  console.log("✅ Implementation contract address:", implementationAddress);
  console.log("✅ Admin contract address:", adminAddress);

  // Attach to the proxy contract
  const box = await BoxV1.attach(proxyContractAddress);

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
