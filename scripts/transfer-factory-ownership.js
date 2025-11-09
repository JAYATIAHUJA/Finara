const hre = require("hardhat");
require('dotenv').config();

async function main() {
  const factoryAddress = process.env.FACTORY_ADDRESS;
  const relayerAddress = process.env.RELAYER_PRIVATE_KEY 
    ? new hre.ethers.Wallet(process.env.RELAYER_PRIVATE_KEY).address 
    : "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  if (!factoryAddress) {
    console.error("Error: FACTORY_ADDRESS not found in .env");
    process.exit(1);
  }

  console.log(`\n🔧 Transferring Factory ownership...`);
  console.log(`Factory: ${factoryAddress}`);
  console.log(`New Owner (Relayer): ${relayerAddress}`);

  const [deployer] = await hre.ethers.getSigners();
  console.log(`Current Owner: ${deployer.address}`);

  const factory = await hre.ethers.getContractAt("BankFactory", factoryAddress);
  
  // Check current owner
  const currentOwner = await factory.owner();
  console.log(`\nCurrent Factory Owner: ${currentOwner}`);
  
  if (currentOwner.toLowerCase() === relayerAddress.toLowerCase()) {
    console.log("✅ Relayer is already the owner!");
    return;
  }

  // Transfer ownership
  console.log("\nTransferring ownership...");
  const tx = await factory.transferOwnership(relayerAddress);
  console.log(`Transaction sent: ${tx.hash}`);
  
  await tx.wait();
  console.log("✅ Ownership transferred successfully!");

  // Verify
  const newOwner = await factory.owner();
  console.log(`New Factory Owner: ${newOwner}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  });
