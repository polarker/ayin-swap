import { number256ToBigint, web3 } from '@alephium/web3';
import {
  buildProject,
  createVestingSchedule,
  ErrorCodes,
  expandTo18Decimals,
  oneAlph,
  randomP2PKHAddress,
  randomTokenId
} from './fixtures/DexFixture';
import { VestingSchedule } from '../artifacts/ts';
import { expectAssertionError } from '@alephium/web3-test';

describe('test vesting schedule', () => {
  web3.setCurrentNodeProvider('http://127.0.0.1:22973');

  beforeEach(async () => {
    await buildProject();
  });

  test('releaseable amount is calculated correctly', async () => {
    const tokenId = randomTokenId();
    const amountTotal = expandTo18Decimals(100);
    const duration = 1000n;
    const beneficiary = randomP2PKHAddress();
    const start = 0n;
    const fixture = createVestingSchedule(tokenId, beneficiary, amountTotal, start, duration);

    const createdAt = fixture.selfState.fields.start;

    let testResult = await VestingSchedule.tests.getReleaseableAmount({
      initialFields: fixture.selfState.fields,
      initialAsset: fixture.selfState.asset,
      blockTimeStamp: Number(createdAt),
      address: fixture.address
    });

    expect(testResult.returns).toEqual(0n);

    testResult = await VestingSchedule.tests.getReleaseableAmount({
      initialFields: fixture.selfState.fields,
      initialAsset: fixture.selfState.asset,
      blockTimeStamp: Number(createdAt + duration / 2n),
      address: fixture.address
    });

    expect(testResult.returns).toEqual(amountTotal / 2n);

    testResult = await VestingSchedule.tests.getReleaseableAmount({
      initialFields: fixture.selfState.fields,
      initialAsset: fixture.selfState.asset,
      blockTimeStamp: Number(createdAt + duration),
      address: fixture.address
    });

    expect(testResult.returns).toEqual(amountTotal);

    testResult = await VestingSchedule.tests.getReleaseableAmount({
      initialFields: fixture.selfState.fields,
      initialAsset: fixture.selfState.asset,
      blockTimeStamp: Number(createdAt + duration + 1n),
      address: fixture.address
    });

    expect(testResult.returns).toEqual(amountTotal);
  }, 10000);

  test('release tokens', async () => {
    const nonBeneficiary = randomP2PKHAddress();
    const beneficiary = randomP2PKHAddress();
    const tokenId = randomTokenId();
    const amountTotal = 100n;

    const fixture = createVestingSchedule(tokenId, beneficiary, amountTotal);

    const releaseResult = await VestingSchedule.tests.claimVestedTokens({
      initialFields: fixture.selfState.fields,
      initialAsset: fixture.selfState.asset,
      address: fixture.address,
      inputAssets: [
        {
          address: beneficiary,
          asset: { alphAmount: oneAlph }
        }
      ]
    });

    const output = releaseResult.txOutputs.find((o) => o.address === beneficiary && o.tokens?.length === 1);

    expect(output?.tokens?.[0].id).toEqual(tokenId);
    expect(output?.tokens?.[0].amount).toEqual(amountTotal);

    const releaseFailResult = VestingSchedule.tests.claimVestedTokens({
      initialFields: fixture.selfState.fields,
      initialAsset: fixture.selfState.asset,
      address: fixture.address,
      inputAssets: [
        {
          address: nonBeneficiary,
          asset: { alphAmount: oneAlph }
        }
      ]
    });

    expectAssertionError(releaseFailResult, fixture.address, ErrorCodes.InvalidCallerAddress);
  }, 10000);
});
