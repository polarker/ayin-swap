import { Deployer } from '@alephium/cli';
import { ONE_ALPH, tokenIdFromAddress } from '@alephium/web3';
import { AyinPresale, AyinToken, MintAyin } from '../artifacts/ts';
import { waitTxConfirmed } from './devnet';

async function deployAlfAlfa(deployer: Deployer) {
  const owner = deployer.account.address;

  const tokensForSale = 100_000n * ONE_ALPH;
  const alphPerToken = ONE_ALPH;

  const ayinResult = await deployer.deployContract(AyinToken, {
    initialFields: {
      totalSupply: 0n,
      owner_: owner,
    },
    issueTokenAmount: 1n << 255n,
  });

  const mintTx = await deployer.runScript(MintAyin.execute, MintAyin.script, {
    initialFields: {
      ayin: ayinResult.contractInstance.contractId,
      amount: tokensForSale,
      to: owner,
    },
    attoAlphAmount: ONE_ALPH,
  });

  await waitTxConfirmed(deployer.provider, mintTx.txId, 1);

  const ayinPresaleResult = await deployer.deployContract(AyinPresale, {
    initialFields: {
      ayinToken: ayinResult.contractInstance.contractId,
      tokensForSale,
      tokensSold: 0n,
      alphBalance: 0n,
      alphPerToken: alphPerToken,
      saleOpen: true,
      owner_: deployer.account.address,
    },
    // initialAttoAlphAmount: ONE_ALPH,
    initialTokenAmounts: [
      {
        id: ayinResult.contractInstance.address,
        amount: tokensForSale,
      },
    ],
  });

  console.log(
    `AyinToken deployed, contract id: ${ayinResult.contractInstance.contractId}`
  );

  console.log(
    `AyinPresale deployed, contract id: ${ayinPresaleResult.contractInstance.contractId}`
  );
}

export default deployAlfAlfa;
