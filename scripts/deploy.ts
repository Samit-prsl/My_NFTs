import { ethers } from "hardhat";

async function main() {
  const NFT = await ethers.getContractFactory("ThalaCoin");
  const nft = await NFT.deploy("Qwerty","QWE");
  
  await nft.deploymentTransaction()?.wait(1);
  console.log("NFT deployed from:", nft.deploymentTransaction()?.from);
  console.log(nft.target);
  
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
