import { ethers } from "hardhat";
import { GetNFT } from "../typechain-types";
import "@nomiclabs/hardhat-etherscan";
async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy GetNFT contract
  const getNFTFactory = await ethers.getContractFactory("GetNFT", deployer);
  const getNFT = await getNFTFactory.deploy();
  await getNFT.deployed();
  console.log("GetNFT deployed to:", getNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
