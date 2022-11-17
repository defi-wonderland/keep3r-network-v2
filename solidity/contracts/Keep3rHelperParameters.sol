// SPDX-License-Identifier: MIT
pragma solidity >=0.8.7 <0.9.0;

import './libraries/FullMath.sol';
import './libraries/TickMath.sol';
import '../interfaces/peripherals/IBaseErrors.sol';
import '../interfaces/IKeep3r.sol';
import '../interfaces/external/IKeep3rV1.sol';
import '../interfaces/IKeep3rHelperParameters.sol';
import './peripherals/Governable.sol';
import './Keep3rHelperParameters.sol';

import '@openzeppelin/contracts/utils/math/Math.sol';
import '@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol';

contract Keep3rHelperParameters is IKeep3rHelperParameters, IBaseErrors, Governable {
  /// @inheritdoc IKeep3rHelperParameters
  address public immutable override KP3R;

  /// @inheritdoc IKeep3rHelperParameters
  uint256 public constant override BOOST_BASE = 10_000;

  /// @inheritdoc IKeep3rHelperParameters
  uint256 public override minBoost = 11_000;

  /// @inheritdoc IKeep3rHelperParameters
  uint256 public override maxBoost = 12_000;

  /// @inheritdoc IKeep3rHelperParameters
  uint256 public override targetBond = 200 ether;

  /// @inheritdoc IKeep3rHelperParameters
  uint256 public override workExtraGas = 30_000;

  /// @inheritdoc IKeep3rHelperParameters
  uint32 public override quoteTwapTime = 10 minutes;

  /// @inheritdoc IKeep3rHelperParameters
  uint256 public override minBaseFee = 15e9;

  /// @inheritdoc IKeep3rHelperParameters
  uint256 public override minPriorityFee = 2e9;

  /// @inheritdoc IKeep3rHelperParameters
  address public override keep3rV2;

  /// @inheritdoc IKeep3rHelperParameters
  IKeep3rHelperParameters.TokenOraclePool public override kp3rWethPool;

  constructor(
    address _kp3r,
    address _keep3rV2,
    address _governance,
    address _kp3rWethPool
  ) Governable(_governance) {
    KP3R = _kp3r;
    keep3rV2 = _keep3rV2;
    kp3rWethPool = _validateOraclePool(_kp3rWethPool, _kp3r);
  }

  /// @inheritdoc IKeep3rHelperParameters
  function setKp3rWethPool(address _poolAddress) external override onlyGovernance {
    if (_poolAddress == address(0)) revert ZeroAddress();
    _setKp3rWethPool(_poolAddress);
  }

  /// @inheritdoc IKeep3rHelperParameters
  function setMinBoost(uint256 _minBoost) external override onlyGovernance {
    minBoost = _minBoost;
    emit MinBoostChange(minBoost);
  }

  /// @inheritdoc IKeep3rHelperParameters
  function setMaxBoost(uint256 _maxBoost) external override onlyGovernance {
    maxBoost = _maxBoost;
    emit MaxBoostChange(maxBoost);
  }

  /// @inheritdoc IKeep3rHelperParameters
  function setTargetBond(uint256 _targetBond) external override onlyGovernance {
    targetBond = _targetBond;
    emit TargetBondChange(targetBond);
  }

  /// @inheritdoc IKeep3rHelperParameters
  function setKeep3rV2(address _keep3rV2) external override onlyGovernance {
    if (_keep3rV2 == address(0)) revert ZeroAddress();
    keep3rV2 = _keep3rV2;
    emit Keep3rV2Change(keep3rV2);
  }

  /// @inheritdoc IKeep3rHelperParameters
  function setWorkExtraGas(uint256 _workExtraGas) external override onlyGovernance {
    workExtraGas = _workExtraGas;
    emit WorkExtraGasChange(workExtraGas);
  }

  /// @inheritdoc IKeep3rHelperParameters
  function setQuoteTwapTime(uint32 _quoteTwapTime) external override onlyGovernance {
    _setQuoteTwapTime(_quoteTwapTime);
  }

  function _setQuoteTwapTime(uint32 _quoteTwapTime) internal {
    quoteTwapTime = _quoteTwapTime;
    emit QuoteTwapTimeChange(quoteTwapTime);
  }

  /// @inheritdoc IKeep3rHelperParameters
  function setMinBaseFee(uint256 _minBaseFee) external override onlyGovernance {
    minBaseFee = _minBaseFee;
    emit MinBaseFeeChange(minBaseFee);
  }

  /// @inheritdoc IKeep3rHelperParameters
  function setMinPriorityFee(uint256 _minPriorityFee) external override onlyGovernance {
    minPriorityFee = _minPriorityFee;
    emit MinPriorityFeeChange(minPriorityFee);
  }

  /// @notice Sets KP3R-WETH pool
  /// @param _poolAddress The address of the KP3R-WETH pool
  function _setKp3rWethPool(address _poolAddress) internal {
    kp3rWethPool = _validateOraclePool(_poolAddress, KP3R);
    emit Kp3rWethPoolChange(kp3rWethPool.poolAddress, kp3rWethPool.isTKNToken0);
  }

  function _validateOraclePool(address _poolAddress, address _token) internal view returns (TokenOraclePool memory _oraclePool) {
    bool _isTKNToken0 = IUniswapV3Pool(_poolAddress).token0() == _token;

    if (!_isTKNToken0 && (IUniswapV3Pool(_poolAddress).token1() != _token)) revert InvalidOraclePool();

    return TokenOraclePool(_poolAddress, _isTKNToken0);
  }
}
