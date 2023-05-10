import { Deployer } from '@alephium/cli';
import { AyinToken } from '../artifacts/ts';

async function deployAlfAlfa(deployer: Deployer) {
  const result = await deployer.deployContract(AyinToken, {
    initialFields: {
      totalSupply: 1n << 255n,
    },
    issueTokenAmount: 1n << 255n,
  });

  console.log(
    `AyinToken deployed, contract id: ${result.contractInstance.contractId}`
  );
}

export default deployAlfAlfa;
