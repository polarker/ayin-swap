import { Deployer, DeployFunction } from '@alephium/cli';
import {
  ALPH_TOKEN_ID,
  DUST_AMOUNT,
  ONE_ALPH,
  subContractId,
} from '@alephium/web3';
import { CreatePair, MintAyin, Staking } from '../src/contracts/ts';

const deployStaking: DeployFunction<undefined> = async (
  deployer: Deployer
): Promise<void> => {
  const stakingAccTemplate = deployer.getDeployContractResult('StakingAccount');
  const factory = deployer.getDeployContractResult('TokenPairFactory');
  const ayin = deployer.getDeployContractResult('AyinToken');

  const ayinTokenId = ayin.contractInstance.contractId;
  const rewardRate = (1_000n * ONE_ALPH) / (1000n * 60n * 60n * 24n); // 1K AYIN/day
  const rewardPool = ONE_ALPH * 100_000n;
  const owner = deployer.account.address;

  await deployer.runScript(MintAyin, {
    initialFields: {
      ayin: ayinTokenId,
      amount: rewardPool + ONE_ALPH,
      to: owner,
    },
    attoAlphAmount: ONE_ALPH,
  });

  await deployer.runScript(CreatePair, {
    initialFields: {
      payer: owner,
      factory:
        deployer.getDeployContractResult('TokenPairFactory').contractInstance
          .contractId,
      alphAmount: ONE_ALPH,
      tokenAId: ayinTokenId,
      tokenBId: ALPH_TOKEN_ID,
    },
    attoAlphAmount: ONE_ALPH + DUST_AMOUNT * 2n,
    tokens: [
      {
        id: ayinTokenId,
        amount: 1n,
      },
      { id: ALPH_TOKEN_ID, amount: 1n },
    ],
  });

  const pairId = subContractId(
    factory.contractInstance.contractId,
    ALPH_TOKEN_ID + ayinTokenId,
    deployer.account.group
  );

  const stakingResult = await deployer.deployContract(Staking, {
    initialFields: {
      tokenId: pairId,
      rewardsTokenId: ayinTokenId,
      stakingAccountTemplateId: stakingAccTemplate.contractInstance.contractId,
      rewardRate,
      totalAmountStaked: 0n,
      rewardPerTokenStored: 0n,
      lastUpdateTime: 0n,
      owner_: deployer.account.address,
      paused_: false,
    },
    initialTokenAmounts: [
      {
        id: ayinTokenId,
        amount: rewardPool,
      },
    ],
  });

  console.log(
    `Staking deployed, id: ${stakingResult.contractInstance.contractId}`
  );
};

export default deployStaking;
