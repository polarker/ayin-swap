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
import { default as PauseableTestContractJson } from "../test/pauseable_test.ral.json";

// Custom types for the contract
export namespace PauseableTestTypes {
  export type Fields = {
    owner_: Address;
    paused_: boolean;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    test_fn: {
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
  PauseableTestInstance,
  PauseableTestTypes.Fields
> {
  at(address: string): PauseableTestInstance {
    return new PauseableTestInstance(address);
  }

  tests = {
    pause: async (
      params: Omit<
        TestContractParams<PauseableTestTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "pause", params);
    },
    unpause: async (
      params: Omit<
        TestContractParams<PauseableTestTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "unpause", params);
    },
    whenNotPaused: async (
      params: Omit<
        TestContractParams<PauseableTestTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "whenNotPaused", params);
    },
    onlyOwner: async (
      params: TestContractParams<PauseableTestTypes.Fields, { caller: Address }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "onlyOwner", params);
    },
    changeOwner: async (
      params: TestContractParams<
        PauseableTestTypes.Fields,
        { newOwner: Address }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "changeOwner", params);
    },
    test_fn: async (
      params: Omit<
        TestContractParams<PauseableTestTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "test_fn", params);
    },
  };
}

// Use this object to test and deploy the contract
export const PauseableTest = new Factory(
  Contract.fromJson(
    PauseableTestContractJson,
    "",
    "60d12ba596d72a9549ac4beca935b53bb8a0e65c608ebe92fde5a51f78ec088d"
  )
);

// Use this class to interact with the blockchain
export class PauseableTestInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<PauseableTestTypes.State> {
    return fetchContractState(PauseableTest, this);
  }

  methods = {
    test_fn: async (
      params?: PauseableTestTypes.CallMethodParams<"test_fn">
    ): Promise<PauseableTestTypes.CallMethodResult<"test_fn">> => {
      return callMethod(
        PauseableTest,
        this,
        "test_fn",
        params === undefined ? {} : params
      );
    },
  };

  async multicall<Calls extends PauseableTestTypes.MultiCallParams>(
    calls: Calls
  ): Promise<PauseableTestTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      PauseableTest,
      this,
      calls
    )) as PauseableTestTypes.MultiCallResults<Calls>;
  }
}
