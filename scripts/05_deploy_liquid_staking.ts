import { Deployer } from '@alephium/cli';
import { ONE_ALPH } from '@alephium/web3';
import { LiquidStaking } from '../artifacts/ts';

async function deployLiquidStaking(deployer: Deployer) {
  const ayin = deployer.getDeployContractResult('AyinToken');

  const symbol = Buffer.from('XAYIN', 'utf8').toString('hex');
  const name = Buffer.from('Staked Ayin', 'utf8').toString('hex');
  const gainPerMillisecond = ONE_ALPH / 100n / 1000n;

  const result = await deployer.deployContract(LiquidStaking, {
    initialFields: {
      tokenId: ayin.contractInstance.contractId,
      symbol,
      name,
      gainPerMillisecond,
      updatedAt: 0n,
      currentXTokenPrice: ONE_ALPH,
      rewardPool: 0n,
      totalSupply: 0n,
      owner_: deployer.account.address,
      paused_: false,
    },
    issueTokenAmount: 1n << 255n,
  });

  console.log(
    `LiquidStaking deployed, contract id: ${result.contractInstance.contractId}`
  );
}

export default deployLiquidStaking;
