import { ONE_ALPH, web3 } from '@alephium/web3';
import {
  expectAssertionError,
  randomContractAddress,
} from '@alephium/web3-test';
import { PauseableTest } from '../artifacts/ts';
import { buildProject, randomP2PKHAddress } from './fixtures/DexFixture';

describe('Pauseable ', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973');

  beforeEach(async () => {
    await buildProject();
  });

  test('pause() and whenNotPaused() work as expected', async () => {
    const owner = randomP2PKHAddress();

    const notPaused = PauseableTest.stateForTest(
      {
        owner,
        paused_: false,
      },
      { alphAmount: ONE_ALPH },
      randomContractAddress()
    );

    const paused = PauseableTest.stateForTest(
      {
        owner,
        paused_: true,
      },
      { alphAmount: ONE_ALPH },
      randomContractAddress()
    );

    const failed = PauseableTest.tests.test_fn({
      initialFields: paused.fields,
      initialAsset: paused.asset,
      address: paused.address,
      inputAssets: [
        {
          address: owner,
          asset: { alphAmount: ONE_ALPH },
        },
      ],
    });

    await expectAssertionError(failed, paused.address, 0);

    const successfull = await PauseableTest.tests.test_fn({
      initialFields: notPaused.fields,
      initialAsset: notPaused.asset,
      address: notPaused.address,
      inputAssets: [
        {
          address: owner,
          asset: { alphAmount: ONE_ALPH },
        },
      ],
    });

    expect(successfull.returns).toBe(42n);
  });
});
