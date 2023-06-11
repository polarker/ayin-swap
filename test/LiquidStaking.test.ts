import { ONE_ALPH, web3 } from '@alephium/web3';
import { LiquidStaking, LiquidStakingTypes } from '../src/contracts/ts';
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
    const inflationRate = ONE_ALPH / 1000n;
    const state = createLiquidStaking(inflationRate);
    const sender = randomP2PKHAddress();

    const testResult = await LiquidStaking.tests.mint({
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

    const withdrawResult = await LiquidStaking.tests.burn({
      initialFields: updatedState.fields,
      initialAsset: updatedState.asset,
      address: state.address,
      testArgs: {
        xTokenAmount: oneAlph,
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

    expect(token?.amount).toEqual(oneAlph * 4n);

    updatedState = withdrawResult.contracts.find(
      (c) => c.address === state.address
    ) as LiquidStakingTypes.State;

    const stakeResult = await LiquidStaking.tests.mint({
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

    expect(token?.amount).toEqual(oneAlph / 4n);
  }, 10000);
});
