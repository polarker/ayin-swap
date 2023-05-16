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
import { default as PermissionsTestContractJson } from "../test/permissions_test.ral.json";

// Custom types for the contract
export namespace PermissionsTestTypes {
  export type Fields = {
    owner: Address;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    something_private: {
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
  PermissionsTestInstance,
  PermissionsTestTypes.Fields
> {
  at(address: string): PermissionsTestInstance {
    return new PermissionsTestInstance(address);
  }

  tests = {
    onlyOwner: async (
      params: TestContractParams<
        PermissionsTestTypes.Fields,
        { caller: Address }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "onlyOwner", params);
    },
    changeOwner: async (
      params: TestContractParams<
        PermissionsTestTypes.Fields,
        { newOwner: Address }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "changeOwner", params);
    },
    something_private: async (
      params: Omit<
        TestContractParams<PermissionsTestTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "something_private", params);
    },
  };
}

// Use this object to test and deploy the contract
export const PermissionsTest = new Factory(
  Contract.fromJson(
    PermissionsTestContractJson,
    "",
    "9faa4a80ad67c7d8360699436106de3efe6b693f883be86e5e3b14e53dbb34a9"
  )
);

// Use this class to interact with the blockchain
export class PermissionsTestInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<PermissionsTestTypes.State> {
    return fetchContractState(PermissionsTest, this);
  }

  methods = {
    something_private: async (
      params?: PermissionsTestTypes.CallMethodParams<"something_private">
    ): Promise<PermissionsTestTypes.CallMethodResult<"something_private">> => {
      return callMethod(
        PermissionsTest,
        this,
        "something_private",
        params === undefined ? {} : params
      );
    },
  };

  async multicall<Calls extends PermissionsTestTypes.MultiCallParams>(
    calls: Calls
  ): Promise<PermissionsTestTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      PermissionsTest,
      this,
      calls
    )) as PermissionsTestTypes.MultiCallResults<Calls>;
  }
}
