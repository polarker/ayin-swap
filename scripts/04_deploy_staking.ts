import { Deployer, DeployFunction } from '@alephium/cli';
import { ONE_ALPH } from '@alephium/web3';
import { Staking } from '../artifacts/ts';
import { randomTokenId } from '../test/fixtures/DexFixture';

const deployStaking: DeployFunction<undefined> = async (
  deployer: Deployer
): Promise<void> => {
  const alphAyinLPTokenId = randomTokenId(); // TODO: Use actual token ID here
  const ayinTokenId = randomTokenId();
  const rewardRate = ONE_ALPH / 1000n;

  const stakingAccTemplate = deployer.getDeployContractResult('StakingAccount');

  const stakingResult = await deployer.deployContract(Staking, {
    initialFields: {
      tokenId: alphAyinLPTokenId,
      rewardsTokenId: ayinTokenId,
      stakingAccountTemplateId: stakingAccTemplate.contractInstance.contractId,
      rewardRate,
      totalAmountStaked: 0n,
      rewardPerTokenStored: 0n,
      lastUpdateTime: 0n,
      owner_: deployer.account.address,
      paused_: false,
    },
  });

  console.log(
    `Staking deployed, id: ${stakingResult.contractInstance.contractId}`
  );
};

export default deployStaking;
