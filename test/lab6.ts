import { ethers } from "hardhat";
import { expect } from "chai";
import { BankToken, BankWithFlashloan, WealthyPrivateClubNFT, GetNFT } from "../typechain-types";

describe("GetNFT", function () {
  let bankToken: BankToken;
  let bankWithFlashloan: BankWithFlashloan;
  let wealthyPrivateClubNFT: WealthyPrivateClubNFT;
  let getNFT: GetNFT;
  let owner: any;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    // Deploy BankToken contract
    const BankToken = await ethers.getContractFactory("BankToken");
    bankToken = await BankToken.deploy();
    await bankToken.deployed();

    // Deploy BankWithFlashloan contract
    const BankWithFlashloan = await ethers.getContractFactory("BankWithFlashloan");
    bankWithFlashloan = await BankWithFlashloan.deploy();
    await bankWithFlashloan.deployed();

    // Deploy WealthyPrivateClubNFT contract
    const WealthyPrivateClubNFT = await ethers.getContractFactory("WealthyPrivateClubNFT");
    wealthyPrivateClubNFT = await WealthyPrivateClubNFT.deploy();
    await wealthyPrivateClubNFT.deployed();

    // Transfer some tokens to BankWithFlashloan contract
    await bankToken.connect(owner).transfer(bankWithFlashloan.address, ethers.utils.parseEther("10000000"));


    // Set bankToken address in BankWithFlashloan and WealthyPrivateClubNFT contracts
    await bankWithFlashloan.connect(owner).setBankToken(bankToken.address);
    await wealthyPrivateClubNFT.connect(owner).setBankToken(bankToken.address);

    // Deploy GetNFT contract
    const GetNFT = await ethers.getContractFactory("GetNFT");
    getNFT = await GetNFT.deploy();
    await getNFT.deployed();
    await getNFT.setBankToken(bankToken.address);
    await getNFT.setBankWithFlashloan(bankWithFlashloan.address);
    await getNFT.setWealthyPrivateClubNFT(wealthyPrivateClubNFT.address);

  });

  it("should only allow owner to call setWealthyPrivateClubNFT function", async function () {
    const newAddress = ethers.utils.getAddress("0x1234567890123456789012345678901234567890");
  
    // Try to call setWealthyPrivateClubNFT function with a non-owner address
    await expect(getNFT.connect(ethers.provider.getSigner(1)).setWealthyPrivateClubNFT(newAddress))
      .to.be.revertedWith("Ownable: caller is not the owner");
  
    // Call setWealthyPrivateClubNFT function with the owner address
    await getNFT.connect(owner).setWealthyPrivateClubNFT(newAddress);
  
    // Check if the WealthyPrivateClubNFT address has been updated
    expect(await getNFT.wealthyPrivateClubNFT()).to.equal(newAddress);
  });

  it("should only allow owner to call setBankWithFlashloan function", async function () {
    const newAddress = ethers.utils.getAddress("0x1234567890123456789012345678901234567890");
  
    // Try to call setBankWithFlashloan function with a non-owner address
    await expect(getNFT.connect(ethers.provider.getSigner(1)).setBankWithFlashloan(newAddress))
      .to.be.revertedWith("Ownable: caller is not the owner");
  
    // Call setBankWithFlashloan function with the owner address
    await getNFT.connect(owner).setBankWithFlashloan(newAddress);
  
    // Check if the BankWithFlashloan address has been updated
    expect(await getNFT.bankWithFlashloan()).to.equal(newAddress);
  });

  it("should only allow owner to call setBankToken function", async function () {
    const newAddress = ethers.utils.getAddress("0x1234567890123456789012345678901234567890");
  
    // Try to call setBankToken function with a non-owner address
    await expect(getNFT.connect(ethers.provider.getSigner(1)).setBankToken(newAddress))
      .to.be.revertedWith("Ownable: caller is not the owner");
  
    // Call setBankToken function with the owner address
    await getNFT.connect(owner).setBankToken(newAddress);
  
    // Check if the BankToken address has been updated
    expect(await getNFT.bankToken()).to.equal(newAddress);
  });

  
  it("should transfer NFT to owner", async function () {
    // Call getNFT function to initiate flashloan
    await getNFT.connect(owner).getNFT(ethers.utils.parseEther("1100000"));

    // Transfer NFT to owner
    const tokenId = 0;
    await getNFT.connect(owner).transferNFT(owner.address, tokenId);

    // Check if NFT has been transferred to owner
    expect(await wealthyPrivateClubNFT.ownerOf(tokenId)).to.equal(owner.address);
  });
  
  it("should only allow owner to call getNFT function", async function () {
    // Try to call getNFT function with a non-owner address
    await expect(getNFT.connect(ethers.provider.getSigner(1)).getNFT(ethers.utils.parseEther("1100000")))
      .to.be.revertedWith("Ownable: caller is not the owner");

    // Call getNFT function with the owner address
    await getNFT.connect(owner).getNFT(ethers.utils.parseEther("1100000"));
  });

  it("should only allow owner to call transferNFT function", async function () {
    // Call getNFT function to initiate flashloan
    await getNFT.connect(owner).getNFT(ethers.utils.parseEther("1100000"));

    // Try to call transferNFT function with a non-owner address
    await expect(getNFT.connect(ethers.provider.getSigner(1)).transferNFT(owner.address, 0))
      .to.be.revertedWith("Ownable: caller is not the owner");

    // Call transferNFT function with the owner address
    await getNFT.connect(owner).transferNFT(owner.address, 0);

    // Check if NFT has been transferred to owner
    expect(await wealthyPrivateClubNFT.ownerOf(0)).to.equal(owner.address);
  });

 

});
