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
import { default as VestingScheduleContractJson } from "../dex/vesting_schedule.ral.json";

// Custom types for the contract
export namespace VestingScheduleTypes {
  export type Fields = {
    tokenId: HexString;
    amountTotal: bigint;
    beneficiary: Address;
    start: bigint;
    duration: bigint;
    released: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getTokenId: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getVestedTotalAmount: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getReleaseableAmount: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getReleased: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getBeneficiary: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<Address>;
    };
    getReleaseAt: {
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
  VestingScheduleInstance,
  VestingScheduleTypes.Fields
> {
  at(address: string): VestingScheduleInstance {
    return new VestingScheduleInstance(address);
  }

  tests = {
    getTokenId: async (
      params: Omit<
        TestContractParams<VestingScheduleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getTokenId", params);
    },
    getVestedTotalAmount: async (
      params: Omit<
        TestContractParams<VestingScheduleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getVestedTotalAmount", params);
    },
    getReleaseableAmount: async (
      params: Omit<
        TestContractParams<VestingScheduleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getReleaseableAmount", params);
    },
    claimVestedTokens: async (
      params: Omit<
        TestContractParams<VestingScheduleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "claimVestedTokens", params);
    },
    getReleased: async (
      params: Omit<
        TestContractParams<VestingScheduleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getReleased", params);
    },
    getBeneficiary: async (
      params: Omit<
        TestContractParams<VestingScheduleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<Address>> => {
      return testMethod(this, "getBeneficiary", params);
    },
    getReleaseAt: async (
      params: Omit<
        TestContractParams<VestingScheduleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getReleaseAt", params);
    },
  };
}

// Use this object to test and deploy the contract
export const VestingSchedule = new Factory(
  Contract.fromJson(
    VestingScheduleContractJson,
    "",
    "41278bde84daf41ba06dbae02b9e1b167b859c6b955b15b219f5c12929dae436"
  )
);

// Use this class to interact with the blockchain
export class VestingScheduleInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<VestingScheduleTypes.State> {
    return fetchContractState(VestingSchedule, this);
  }

  methods = {
    getTokenId: async (
      params?: VestingScheduleTypes.CallMethodParams<"getTokenId">
    ): Promise<VestingScheduleTypes.CallMethodResult<"getTokenId">> => {
      return callMethod(
        VestingSchedule,
        this,
        "getTokenId",
        params === undefined ? {} : params
      );
    },
    getVestedTotalAmount: async (
      params?: VestingScheduleTypes.CallMethodParams<"getVestedTotalAmount">
    ): Promise<
      VestingScheduleTypes.CallMethodResult<"getVestedTotalAmount">
    > => {
      return callMethod(
        VestingSchedule,
        this,
        "getVestedTotalAmount",
        params === undefined ? {} : params
      );
    },
    getReleaseableAmount: async (
      params?: VestingScheduleTypes.CallMethodParams<"getReleaseableAmount">
    ): Promise<
      VestingScheduleTypes.CallMethodResult<"getReleaseableAmount">
    > => {
      return callMethod(
        VestingSchedule,
        this,
        "getReleaseableAmount",
        params === undefined ? {} : params
      );
    },
    getReleased: async (
      params?: VestingScheduleTypes.CallMethodParams<"getReleased">
    ): Promise<VestingScheduleTypes.CallMethodResult<"getReleased">> => {
      return callMethod(
        VestingSchedule,
        this,
        "getReleased",
        params === undefined ? {} : params
      );
    },
    getBeneficiary: async (
      params?: VestingScheduleTypes.CallMethodParams<"getBeneficiary">
    ): Promise<VestingScheduleTypes.CallMethodResult<"getBeneficiary">> => {
      return callMethod(
        VestingSchedule,
        this,
        "getBeneficiary",
        params === undefined ? {} : params
      );
    },
    getReleaseAt: async (
      params?: VestingScheduleTypes.CallMethodParams<"getReleaseAt">
    ): Promise<VestingScheduleTypes.CallMethodResult<"getReleaseAt">> => {
      return callMethod(
        VestingSchedule,
        this,
        "getReleaseAt",
        params === undefined ? {} : params
      );
    },
  };

  async multicall<Calls extends VestingScheduleTypes.MultiCallParams>(
    calls: Calls
  ): Promise<VestingScheduleTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      VestingSchedule,
      this,
      calls
    )) as VestingScheduleTypes.MultiCallResults<Calls>;
  }
}