// contracts/BoxV2.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BoxV2 {
    uint256 public value;

    function increamentValue() public {
        value += 1;
    }
}
