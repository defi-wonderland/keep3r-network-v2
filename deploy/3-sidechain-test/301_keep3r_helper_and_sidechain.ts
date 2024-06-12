import { getChainId } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { toUnit } from '../../test/utils/bn';
import { addressRegistry } from '../../utils/constants';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, governor, kp3rV1, kp3rWethOracle, wethUsdOracle, usdDecimals } = await hre.getNamedAccounts();
  const keep3rEscrow = await hre.deployments.get('Keep3rEscrow');

  const chainId: number = Number(getChainId());

  let mainnetKp3rV1: string;
  let mainnetWeth: string;
  let router: string;

  if (chainId in addressRegistry.kp3rV1 && chainId in addressRegistry.weth && chainId in addressRegistry.router) {
    mainnetKp3rV1 = addressRegistry.kp3rV1[chainId as keyof typeof addressRegistry.kp3rV1];
    mainnetWeth = addressRegistry.weth[chainId as keyof typeof addressRegistry.weth];
    router = addressRegistry.router[chainId as keyof typeof addressRegistry.router];
  } else {
    throw new Error('ChainId not found in addressRegistry');
  }

  // swap ABI
  const swapRouterABI = [
    'function exactInputSingle(tuple tokenIn,uint256 amountIn,uint256 amountOutMinimum,uint256 sqrtPriceLimitX96,address to,uint256 deadline) external payable returns (uint256 amountOut)',
  ];

  // swap router address

  const swapRouter = await hre.ethers.getContractAt(swapRouterABI, router);

  const exactInputSingleParams = {
    tokenIn: mainnetKp3rV1,
    tokenOut: mainnetWeth,
    fee: 10000,
    recipient: deployer,
    deadline: 2_000_000_000,
    amountIn: toUnit(100),
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  };
  await swapRouter.exactInputSingle(exactInputSingleParams, { from: deployer });

  // precalculate the address of Keep3rV2 contract
  const currentNonce: number = await hre.ethers.provider.getTransactionCount(deployer);
  const keeperV2Address: string = hre.ethers.utils.getContractAddress({ from: deployer, nonce: currentNonce + 1 });

  const keep3rHelperArgs = [keeperV2Address, governor, mainnetKp3rV1, mainnetWeth, kp3rWethOracle, wethUsdOracle, usdDecimals];

  const keep3rHelper = await hre.deployments.deploy('Keep3rHelperSidechain', {
    from: deployer,
    contract: 'solidity/contracts/sidechain/Keep3rHelperSidechain.sol:Keep3rHelperSidechain',
    args: keep3rHelperArgs,
    log: true,
  });

  const keep3rV2Args = [governor, keep3rHelper.address, kp3rV1, keep3rEscrow.address];

  await hre.deployments.deploy('Keep3rSidechainForTestnet', {
    contract: 'solidity/for-test/testnet/Keep3rSidechainForTestnet.sol:Keep3rSidechainForTestnet',
    from: deployer,
    args: keep3rV2Args,
    log: true,
  });
};

deployFunction.dependencies = ['keep3r-escrow', 'save-oracles'];
deployFunction.tags = ['testnet-keep3r-sidechain'];

export default deployFunction;
