import { ONE_ALPH, web3 } from '@alephium/web3';
import {
  expectAssertionError,
  randomContractAddress,
} from '@alephium/web3-test';
import { PermissionsTest, PermissionsTestTypes } from '../artifacts/ts';
import { buildProject, randomP2PKHAddress } from './fixtures/DexFixture';

describe('Permissions ', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973');

  beforeEach(async () => {
    await buildProject();
  });

  test('onlyOwner() and changeOwner() works as expected', async () => {
    const owner = randomP2PKHAddress();
    const nonOwner = randomP2PKHAddress();

    const callPrivateMethod = (
      address: string,
      state: PermissionsTestTypes.State
    ) =>
      PermissionsTest.tests.something_private({
        initialFields: state.fields,
        initialAsset: state.asset,
        address: state.address,
        inputAssets: [
          {
            address,
            asset: { alphAmount: ONE_ALPH },
          },
        ],
      });

    const state = PermissionsTest.stateForTest(
      {
        owner_: owner,
      },
      { alphAmount: ONE_ALPH },
      randomContractAddress()
    );

    let failed = callPrivateMethod(nonOwner, state);
    await expectAssertionError(failed, state.address, 0);

    let successfull = await callPrivateMethod(owner, state);
    expect(successfull.returns).toBe(42n);

    const result = await PermissionsTest.tests.changeOwner({
      initialFields: state.fields,
      initialAsset: state.asset,
      address: state.address,
      testArgs: {
        newOwner: nonOwner,
      },
      inputAssets: [
        {
          address: owner,
          asset: { alphAmount: ONE_ALPH },
        },
      ],
    });

    const newState = result.contracts.find(
      (c) => c.contractId === state.contractId
    ) as PermissionsTestTypes.State;

    failed = callPrivateMethod(owner, newState);
    await expectAssertionError(failed, newState.address, 0);

    successfull = await callPrivateMethod(nonOwner, newState);
    expect(successfull.returns).toBe(42n);
  });
});
