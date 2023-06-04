import { Deployer } from '@alephium/cli';
import { ONE_ALPH } from '@alephium/web3';
import { AyinPresale, MintAyin } from '../src/contracts/ts';

async function deployAyin(deployer: Deployer) {
  const owner = deployer.account.address;

  const ayin = deployer.getDeployContractResult('AyinToken');

  const tokensForSale = 100_000n * ONE_ALPH;
  const alphPerToken = ONE_ALPH;

  const mintTx = await deployer.runScript(MintAyin, {
    initialFields: {
      ayin: ayin.contractInstance.contractId,
      amount: tokensForSale,
      to: owner,
    },
    attoAlphAmount: ONE_ALPH,
  });

  const ayinPresaleResult = await deployer.deployContract(AyinPresale, {
    initialFields: {
      ayinToken: ayin.contractInstance.contractId,
      tokensForSale,
      tokensSold: 0n,
      alphBalance: 0n,
      alphPerToken: alphPerToken,
      saleOpen: true,
      owner_: deployer.account.address,
    },
    initialTokenAmounts: [
      {
        id: ayin.contractInstance.contractId,
        amount: tokensForSale,
      },
    ],
  });
}

export default deployAyin;
