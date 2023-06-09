// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface GasPriceGetter {
    function getBaseFeePerGasForBlock(uint256 blockHash) external view returns (uint256);
}