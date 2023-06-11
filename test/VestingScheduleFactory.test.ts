import { web3 } from '@alephium/web3';
import {
  buildProject,
  createVestingScheduleFactory,
  oneAlph,
  randomP2PKHAddress,
  randomTokenId,
} from './fixtures/DexFixture';
import {
  VestingScheduleFactory,
  VestingScheduleFactoryTypes,
} from '../src/contracts/ts';

describe('test vesting schedule factory', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973');

  beforeEach(async () => {
    await buildProject();
  });

  test('create vesting schedule', async () => {
    const payer = randomP2PKHAddress();
    const fixture = createVestingScheduleFactory(payer);
    const amountTotal = oneAlph * 100n;
    const tokenId = randomTokenId();

    const testResult = await VestingScheduleFactory.tests.createSchedule({
      initialFields: fixture.selfState.fields,
      address: fixture.address,
      existingContracts: fixture.dependencies,
      testArgs: {
        tokenId,
        amount: amountTotal,
        beneficiary: payer,
        duration: 100n,
      },
      inputAssets: [
        {
          address: payer,
          asset: {
            alphAmount: oneAlph * 2n,
            tokens: [{ id: tokenId, amount: amountTotal }],
          },
        },
      ],
    });

    const createdEvent = testResult
      .events[1] as VestingScheduleFactoryTypes.VestingScheduleCreatedEvent;
    const tokens = testResult.contracts[0]?.asset.tokens;

    expect(tokens).toEqual([{ id: tokenId, amount: amountTotal }]);

    expect(createdEvent.fields.beneiciary).toEqual(payer);
    expect(createdEvent.fields.token).toEqual(tokenId);
    expect(createdEvent.fields.amount).toEqual(oneAlph * 100n);
  }, 10000);
});
