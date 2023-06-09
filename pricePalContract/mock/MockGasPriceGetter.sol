// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "interface/IGasPriceGetter.sol";

contract MockGasPriceGetter is GasPriceGetter {
    constructor() public {}

    function getBaseFeePerGasForBlock(uint256 blockHash) external view returns (uint256) {
        return 100; // just a mock value
    }
}