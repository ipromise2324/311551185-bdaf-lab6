// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract WealthyPrivateClubNFT is Ownable, ERC721 {

    event YouAreRich(address newWealthyMan);
    uint256 id = 0;
    
    address public bankToken;
    mapping (address => bool) public wealthyList;

    constructor() ERC721("WPC", "WPC") {}

    function setBankToken(address newToken) external onlyOwner {
        bankToken = newToken;
    }

    function iDeclareBeingRich() external {
        require(IERC20(bankToken).balanceOf(msg.sender) > 1000000e18, "you're poor");
        if(!wealthyList[msg.sender]){
            wealthyList[msg.sender] = true;
            _mint(msg.sender, id);
            id++;
            emit YouAreRich(msg.sender);
        }
    }
}
