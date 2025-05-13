const { ethers, upgrades } = require("hardhat");

async function main() {
  const BoxV1 = await ethers.getContractFactory("BoxV1");

  const proxyContract = await upgrades.deployProxy(BoxV1, [768], {
    initializer: "setValue",
  });

  await proxyContract.waitForDeployment();

  const proxyContractAddress = await proxyContract.getAddress();
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyContractAddress
  ); // this is our BoxV1 contract
  const adminAddress = await upgrades.erc1967.getAdminAddress(
    proxyContractAddress
  ); // this contract is created by openzeppline by his self

  console.log("Proxy contract address:", proxyContractAddress);
  console.log("Implementation contract address:", implementationAddress);
  console.log("Admin contract address:", adminAddress);
}

// Execute the main function and catch any errors
main().catch((error) => {
  console.error(error);
  process.exit(1);
});

// Proxy contract address: 0x41491F1A6C2531EE2c165dE01404b5e9c68b1028
// Implementation V1 Contract address: 0xAE70255cA7Bb36dcD9228FcaA6FC421a38433787
// Admin contract address: 0x89BbCC9F3E0847B588da3Faf094ea39c62A1B640
