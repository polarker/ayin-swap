import { Deployer } from '@alephium/cli';
import { ONE_ALPH } from '@alephium/web3';
import { LiquidStaking, MintAyin } from '../src/contracts/ts';

async function deployLiquidStaking(deployer: Deployer) {
  const ayin = deployer.getDeployContractResult('AyinToken');

  const symbol = Buffer.from('XAYIN', 'utf8').toString('hex');
  const name = Buffer.from('Staked Ayin', 'utf8').toString('hex');
  const gainPerMillisecond = ONE_ALPH / 100n / 1000n;
  const inflationPool = 300_000n * ONE_ALPH;
  const inflationRate = inflationPool / (365n * 24n * 60n * 60n * 1000n);
  const owner = deployer.account.address;

  await deployer.runScript(MintAyin, {
    initialFields: {
      ayin: ayin.contractInstance.contractId,
      amount: inflationPool,
      to: owner,
    },
    attoAlphAmount: ONE_ALPH,
  });

  const result = await deployer.deployContract(LiquidStaking, {
    initialFields: {
      tokenId: ayin.contractInstance.contractId,
      symbol,
      name,
      gainPerMillisecond,
      inflationRate,
      inflationPool,
      updatedAt: 0n,
      currentXTokenPrice: ONE_ALPH,
      rewardPool: 0n,
      totalSupply: 0n,
      owner_: owner,
      paused_: false,
    },
    initialTokenAmounts: [
      {
        id: ayin.contractInstance.contractId,
        amount: inflationPool,
      },
    ],
    issueTokenAmount: 1n << 255n,
  });

  console.log(
    `LiquidStaking deployed, contract id: ${result.contractInstance.contractId}`
  );
}

export default deployLiquidStaking;
