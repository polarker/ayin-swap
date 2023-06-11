import { Deployer } from '@alephium/cli';
import { AyinToken } from '../src/contracts/ts';

async function deployAyin(deployer: Deployer) {
  const owner = deployer.account.address;

  const ayinResult = await deployer.deployContract(AyinToken, {
    initialFields: {
      totalSupply: 0n,
      owner_: owner,
    },
    issueTokenAmount: 1n << 255n,
  });

  console.log(
    `AyinToken deployed, contract id: ${ayinResult.contractInstance.contractId}`
  );

  // console.log(
  //   `AyinPresale deployed, contract id: ${ayinPresaleResult.contractInstance.contractId}`
  // );
}

export default deployAyin;
