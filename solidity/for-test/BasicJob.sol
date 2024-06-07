// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import "../interfaces/IKeep3r.sol";

contract BasicJob {
    error KeeperNotValid();

    address public keep3r;
    uint256 public nonce;
    uint256[] public array;

    constructor(address _keep3r) {
        keep3r = _keep3r;
    }

    function test() external {
        array.push(1);
    }
}
