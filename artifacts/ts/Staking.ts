/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  SubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
} from "@alephium/web3";
import { default as StakingContractJson } from "../dex/staking.ral.json";

// Custom types for the contract
export namespace StakingTypes {
  export type Fields = {
    rewardsTokenId: HexString;
    rewardRate: bigint;
    totalAmountStaked: bigint;
    rewardPerTokenStored: bigint;
    lastUpdateTime: bigint;
  };

  export type State = ContractState<Fields>;
}

class Factory extends ContractFactory<StakingInstance, StakingTypes.Fields> {
  at(address: string): StakingInstance {
    return new StakingInstance(address);
  }

  tests = {
    updateReward: async (
      params: TestContractParams<StakingTypes.Fields, { account: HexString }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "updateReward", params);
    },
    earned: async (
      params: TestContractParams<StakingTypes.Fields, { acc: HexString }>
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "earned", params);
    },
    calculateRewardPerToken: async (
      params: Omit<TestContractParams<StakingTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "calculateRewardPerToken", params);
    },
    stake: async (
      params: TestContractParams<
        StakingTypes.Fields,
        { stakingAccount: HexString; amount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "stake", params);
    },
    unstake: async (
      params: TestContractParams<
        StakingTypes.Fields,
        { stakingAccount: HexString; amount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "unstake", params);
    },
    claimRewards: async (
      params: TestContractParams<
        StakingTypes.Fields,
        { stakingAccount: HexString }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "claimRewards", params);
    },
  };
}

// Use this object to test and deploy the contract
export const Staking = new Factory(
  Contract.fromJson(
    StakingContractJson,
    "",
    "e24360ffb610ae71a4c834d240e19bebf463e41b956142dde5c2c74e7af7fc05"
  )
);

// Use this class to interact with the blockchain
export class StakingInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<StakingTypes.State> {
    return fetchContractState(Staking, this);
  }
}