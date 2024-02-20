// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract EcoMint is ERC20, ERC20Burnable {
    constructor() ERC20("EcoMint", "ECO") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}
