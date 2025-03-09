// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BoxV2 {
    uint256 private value;

    function doubleValue() public {
        value = value * 2; // Modified logic
    }
    function getValue() public view returns (uint256) {
        return value;
    }
}
