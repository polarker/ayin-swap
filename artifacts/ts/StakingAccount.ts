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
import { default as StakingAccountContractJson } from "../dex/staking_account.ral.json";

// Custom types for the contract
export namespace StakingAccountTypes {
  export type Fields = {
    tokenId: HexString;
    rewardsTokenId: HexString;
    staker: Address;
    amountStaked: bigint;
    rewardPerTokenPaid: bigint;
    rewards: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getTokenId: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getRewardsTokenId: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getStaker: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<Address>;
    };
    getAmountStaked: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getRewardPerTokenPaid: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getRewards: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
}

class Factory extends ContractFactory<
  StakingAccountInstance,
  StakingAccountTypes.Fields
> {
  at(address: string): StakingAccountInstance {
    return new StakingAccountInstance(address);
  }

  tests = {
    getTokenId: async (
      params: Omit<
        TestContractParams<StakingAccountTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getTokenId", params);
    },
    getRewardsTokenId: async (
      params: Omit<
        TestContractParams<StakingAccountTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getRewardsTokenId", params);
    },
    getStaker: async (
      params: Omit<
        TestContractParams<StakingAccountTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<Address>> => {
      return testMethod(this, "getStaker", params);
    },
    getAmountStaked: async (
      params: Omit<
        TestContractParams<StakingAccountTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getAmountStaked", params);
    },
    getRewardPerTokenPaid: async (
      params: Omit<
        TestContractParams<StakingAccountTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getRewardPerTokenPaid", params);
    },
    getRewards: async (
      params: Omit<
        TestContractParams<StakingAccountTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getRewards", params);
    },
    setRewards: async (
      params: TestContractParams<
        StakingAccountTypes.Fields,
        { newRewards: bigint; newRewardPerToken: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "setRewards", params);
    },
    stake: async (
      params: TestContractParams<StakingAccountTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "stake", params);
    },
    unstake: async (
      params: TestContractParams<StakingAccountTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "unstake", params);
    },
    claimRewards: async (
      params: TestContractParams<
        StakingAccountTypes.Fields,
        { rewardsAmount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "claimRewards", params);
    },
  };
}

// Use this object to test and deploy the contract
export const StakingAccount = new Factory(
  Contract.fromJson(
    StakingAccountContractJson,
    "",
    "5777923c37da9220d043fb94f9fd3c6a57fc3ab3e79d77d87264fab483205d47"
  )
);

// Use this class to interact with the blockchain
export class StakingAccountInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<StakingAccountTypes.State> {
    return fetchContractState(StakingAccount, this);
  }

  methods = {
    getTokenId: async (
      params?: StakingAccountTypes.CallMethodParams<"getTokenId">
    ): Promise<StakingAccountTypes.CallMethodResult<"getTokenId">> => {
      return callMethod(
        StakingAccount,
        this,
        "getTokenId",
        params === undefined ? {} : params
      );
    },
    getRewardsTokenId: async (
      params?: StakingAccountTypes.CallMethodParams<"getRewardsTokenId">
    ): Promise<StakingAccountTypes.CallMethodResult<"getRewardsTokenId">> => {
      return callMethod(
        StakingAccount,
        this,
        "getRewardsTokenId",
        params === undefined ? {} : params
      );
    },
    getStaker: async (
      params?: StakingAccountTypes.CallMethodParams<"getStaker">
    ): Promise<StakingAccountTypes.CallMethodResult<"getStaker">> => {
      return callMethod(
        StakingAccount,
        this,
        "getStaker",
        params === undefined ? {} : params
      );
    },
    getAmountStaked: async (
      params?: StakingAccountTypes.CallMethodParams<"getAmountStaked">
    ): Promise<StakingAccountTypes.CallMethodResult<"getAmountStaked">> => {
      return callMethod(
        StakingAccount,
        this,
        "getAmountStaked",
        params === undefined ? {} : params
      );
    },
    getRewardPerTokenPaid: async (
      params?: StakingAccountTypes.CallMethodParams<"getRewardPerTokenPaid">
    ): Promise<
      StakingAccountTypes.CallMethodResult<"getRewardPerTokenPaid">
    > => {
      return callMethod(
        StakingAccount,
        this,
        "getRewardPerTokenPaid",
        params === undefined ? {} : params
      );
    },
    getRewards: async (
      params?: StakingAccountTypes.CallMethodParams<"getRewards">
    ): Promise<StakingAccountTypes.CallMethodResult<"getRewards">> => {
      return callMethod(
        StakingAccount,
        this,
        "getRewards",
        params === undefined ? {} : params
      );
    },
  };

  async multicall<Calls extends StakingAccountTypes.MultiCallParams>(
    calls: Calls
  ): Promise<StakingAccountTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      StakingAccount,
      this,
      calls
    )) as StakingAccountTypes.MultiCallResults<Calls>;
  }
}
