import { Deployer, DeployFunction } from '@alephium/cli';
import { ALPH_TOKEN_ID, ONE_ALPH } from '@alephium/web3';
import { Router, Staking } from '../artifacts/ts';

const deployRouter: DeployFunction<undefined> = async (
  deployer: Deployer
): Promise<void> => {
  const result = await deployer.deployContract(Router, { initialFields: {} });
  console.log(
    `Router contract address: ${result.contractInstance.address}, contract id: ${result.contractInstance.contractId}`
  );

  const stakingResult = await deployer.deployContract(Staking, {
    initialFields: {
      rewardsTokenId: ALPH_TOKEN_ID,
      rewardRate: ONE_ALPH / 1000n,
      totalAmountStaked: 0n,
      rewardPerTokenStored: 0n,
      lastUpdateTime: 0n,
    },
  });

  console.log('Staking deployed');
};

export default deployRouter;
