import { ONE_ALPH, web3 } from '@alephium/web3';
import { LiquidStaking, LiquidStakingTypes } from '../artifacts/ts';
import {
  buildProject,
  createLiquidStaking,
  oneAlph,
  randomP2PKHAddress,
} from './fixtures/DexFixture';

describe('XAyin ', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973');

  beforeEach(async () => {
    await buildProject();
  });

  test('create staking account', async () => {
    const state = createLiquidStaking();
    const sender = randomP2PKHAddress();

    const testResult = await LiquidStaking.tests.stake({
      initialFields: state.selfState.fields,
      initialAsset: state.selfState.asset,
      testArgs: {
        amount: oneAlph,
      },
      address: state.address,
      blockTimeStamp: 0,
      inputAssets: [
        {
          address: sender,
          asset: {
            alphAmount: ONE_ALPH,
            tokens: [
              {
                id: state.selfState.fields.tokenId,
                amount: oneAlph,
              },
            ],
          },
        },
      ],
    });

    let outputs = testResult.txOutputs.find(
      (o) => o.address === sender && o.tokens?.length === 1
    );

    let updatedState = testResult.contracts.find(
      (c) => c.address === state.address
    ) as LiquidStakingTypes.State;

    expect(outputs?.tokens?.[0].amount).toEqual(oneAlph);

    const withdrawResult = await LiquidStaking.tests.unstake({
      initialFields: updatedState.fields,
      initialAsset: updatedState.asset,
      address: state.address,
      testArgs: {
        amount: oneAlph,
      },
      blockTimeStamp: 1000000,
      inputAssets: [
        {
          address: sender,
          asset: {
            alphAmount: oneAlph,
            tokens: [
              {
                id: state.contractId,
                amount: oneAlph,
              },
            ],
          },
        },
      ],
    });

    outputs = withdrawResult.txOutputs.find(
      (o) => o.address === sender && o.tokens?.length === 1
    );

    let token = outputs?.tokens?.find(
      (t) => t.id === state.selfState.fields.tokenId
    );

    expect(token?.amount).toEqual(oneAlph * 3n);

    updatedState = withdrawResult.contracts.find(
      (c) => c.address === state.address
    ) as LiquidStakingTypes.State;

    const stakeResult = await LiquidStaking.tests.stake({
      initialFields: updatedState.fields,
      initialAsset: updatedState.asset,
      testArgs: {
        amount: oneAlph,
      },
      address: state.address,
      blockTimeStamp: 2000000,
      inputAssets: [
        {
          address: sender,
          asset: {
            alphAmount: ONE_ALPH,
            tokens: [
              {
                id: state.selfState.fields.tokenId,
                amount: oneAlph,
              },
            ],
          },
        },
      ],
    });

    outputs = stakeResult.txOutputs.find(
      (o) => o.address === sender && o.tokens?.length === 1
    );

    token = outputs?.tokens?.find((t) => t.id === state.contractId);
    console.log(token);

    expect(token?.amount).toEqual(oneAlph / 3n);
  }, 10000);
});
