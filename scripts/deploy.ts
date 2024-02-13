import { ethers } from "hardhat";

async function main() {
  const NFT = await ethers.getContractFactory("ThalaCoin");
  const nft = await NFT.deploy();

  await nft.deploymentTransaction()?.wait(1);
  console.log("NFT deployed from:", nft.deploymentTransaction()?.from);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
