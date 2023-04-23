// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract BankToken is ERC20 {
    constructor() ERC20("Bank", "Bank") {
        _mint(msg.sender, 10000000e18);
    }
}