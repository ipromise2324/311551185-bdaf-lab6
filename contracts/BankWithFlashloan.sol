// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFlashloanExecutor {
    function executeWithMoney(uint256 amount) external;
}

contract BankWithFlashloan is Ownable {
    
    address public bankToken;

    function setBankToken(address newToken) external onlyOwner {
        bankToken = newToken;
    }

    function flashloan(address borrower, uint256 amount) external {
        uint256 oldBalance = IERC20(bankToken).balanceOf(address(this));

        IERC20(bankToken).transfer(borrower, amount);
        IFlashloanExecutor(borrower).executeWithMoney(amount);

        uint256 newBalance = IERC20(bankToken).balanceOf(address(this));
        require(newBalance >= oldBalance, "loan is not returned"); 
    }
}