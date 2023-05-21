import { Deployer, DeployFunction } from '@alephium/cli';
import { randomContractId } from '@alephium/web3-test';
import { StakingAccount, TokenPair, VestingSchedule } from '../artifacts/ts';
import { randomP2PKHAddress } from '../test/fixtures/DexFixture';

const deployTokenPairTemplate: DeployFunction<undefined> = async (
  deployer: Deployer
): Promise<void> => {
  const initialFields = {
    token0Id: '',
    token1Id: '',
    reserve0: 0n,
    reserve1: 0n,
    blockTimeStampLast: 0n,
    price0CumulativeLast: 0n,
    price1CumulativeLast: 0n,
    totalSupply: 0n,
  };
  const tokenPairResult = await deployer.deployContract(TokenPair, {
    initialFields: initialFields,
  });
  console.log(
    `TokenPair template contract address: ${tokenPairResult.contractInstance.address}, contract id: ${tokenPairResult.contractInstance.contractId}`
  );

  const scheduleInitialFields = {
    tokenId: '',
    amountTotal: 0n,
    beneficiary: randomP2PKHAddress(),
    start: 0n,
    duration: 0n,
    released: 0n,
  };

  const vestingScheduleResult = await deployer.deployContract(VestingSchedule, {
    initialFields: scheduleInitialFields,
  });

  console.log(
    `VestingSchedule template contract address: ${vestingScheduleResult.contractInstance.address}, contract id: ${vestingScheduleResult.contractInstance.contractId}`
  );

  const scheduleResult = await deployer.deployContract(VestingSchedule, {
    initialFields: scheduleInitialFields,
  });

  await deployer.deployContract(StakingAccount, {
    initialFields: {
      tokenId: '',
      rewardsTokenId: '',
      staker: deployer.account.address,
      amountStaked: 0n,
      rewardPerTokenPaid: 0n,
      rewards: 0n,
      parentContractAddress: randomP2PKHAddress(),
    },
  });
};

export default deployTokenPairTemplate;
