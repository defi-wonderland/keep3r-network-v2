import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { verifyContract } from 'utils/deploy';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const keep3rEscrow = await hre.deployments.get('Keep3rEscrow');
  await verifyContract(hre, keep3rEscrow);

  const keep3rHelper = await hre.deployments.get('Keep3rHelperSidechain');
  await verifyContract(hre, keep3rHelper);

  const keep3rV2 = await hre.deployments.get('Keep3rSidechain');
  await verifyContract(hre, keep3rV2);

  const kp3rV1 = await hre.deployments.get('KP3Rv1');
  await verifyContract(hre, kp3rV1);
};

deployFunction.tags = ['verify-sidechain'];

export default deployFunction;
