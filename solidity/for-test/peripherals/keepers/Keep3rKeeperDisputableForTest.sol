// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4 <0.9.0;

import '../../../contracts/peripherals/keepers/Keep3rKeeperDisputable.sol';

contract Keep3rKeeperDisputableForTest is Keep3rKeeperDisputable {
  using EnumerableSet for EnumerableSet.AddressSet;

  constructor(
    address _kph,
    address _keep3rV1,
    address _keep3rV1Proxy,
    address _kp3rWethPool
  ) Keep3rParameters(_kph, _keep3rV1, _keep3rV1Proxy, _kp3rWethPool) Keep3rRoles(msg.sender) {}

  function setKeeper(address _keeper) external {
    _keepers.add(_keeper);
  }

  function internalSlash(
    address _bonded,
    address _keeper,
    uint256 _bondAmount,
    uint256 _unbondAmount
  ) external {
    _slash(_bonded, _keeper, _bondAmount, _unbondAmount);
  }

  function isKeeper(address _address) external view returns (bool _isKeeper) {
    _isKeeper = _keepers.contains(_address);
  }
}
