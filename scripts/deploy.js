const hre = require("hardhat");

async function main() {

  const Contract = await hre.ethers.getContractFactory("GameItem")
  const contract = await Contract.deploy();
  console.log("Contract deployed to:", await contract.getAddress());
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
