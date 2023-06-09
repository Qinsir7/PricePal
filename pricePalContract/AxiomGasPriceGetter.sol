// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "interface/IGasPriceGetter.sol";

contract AxiomGasPriceGetter is GasPriceGetter {
    address axiomContractAddress;

    constructor(address _axiomContractAddress) public {
        axiomContractAddress = _axiomContractAddress;
    }

    function getBaseFeePerGasForBlock(uint256 blockHash) external view returns (uint256) {
        // TODO: call into Axiom contract using axiomContractAddress
        return 100;
    }
}