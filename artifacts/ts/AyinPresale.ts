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
import { default as AyinPresaleContractJson } from "../dex/ayin_presale.ral.json";

// Custom types for the contract
export namespace AyinPresaleTypes {
  export type Fields = {
    ayinToken: HexString;
    tokensForSale: bigint;
    alphPerToken: bigint;
    saleOpen: boolean;
    tokensSold: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    tokensLeft: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getAlphPerToken: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getSaleOpen: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<boolean>;
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
  AyinPresaleInstance,
  AyinPresaleTypes.Fields
> {
  at(address: string): AyinPresaleInstance {
    return new AyinPresaleInstance(address);
  }

  tests = {
    tokensLeft: async (
      params: Omit<
        TestContractParams<AyinPresaleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "tokensLeft", params);
    },
    getAlphPerToken: async (
      params: Omit<
        TestContractParams<AyinPresaleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getAlphPerToken", params);
    },
    getSaleOpen: async (
      params: Omit<
        TestContractParams<AyinPresaleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<boolean>> => {
      return testMethod(this, "getSaleOpen", params);
    },
    setSaleOpen: async (
      params: TestContractParams<AyinPresaleTypes.Fields, { open: boolean }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "setSaleOpen", params);
    },
    setAlphPerToken: async (
      params: TestContractParams<AyinPresaleTypes.Fields, { apt: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "setAlphPerToken", params);
    },
    buy: async (
      params: TestContractParams<AyinPresaleTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "buy", params);
    },
  };
}

// Use this object to test and deploy the contract
export const AyinPresale = new Factory(
  Contract.fromJson(
    AyinPresaleContractJson,
    "",
    "97cb2b09014f7c1117c10f3f073521ec513f9c13bd792a43da99a728e3f09e45"
  )
);

// Use this class to interact with the blockchain
export class AyinPresaleInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<AyinPresaleTypes.State> {
    return fetchContractState(AyinPresale, this);
  }

  methods = {
    tokensLeft: async (
      params?: AyinPresaleTypes.CallMethodParams<"tokensLeft">
    ): Promise<AyinPresaleTypes.CallMethodResult<"tokensLeft">> => {
      return callMethod(
        AyinPresale,
        this,
        "tokensLeft",
        params === undefined ? {} : params
      );
    },
    getAlphPerToken: async (
      params?: AyinPresaleTypes.CallMethodParams<"getAlphPerToken">
    ): Promise<AyinPresaleTypes.CallMethodResult<"getAlphPerToken">> => {
      return callMethod(
        AyinPresale,
        this,
        "getAlphPerToken",
        params === undefined ? {} : params
      );
    },
    getSaleOpen: async (
      params?: AyinPresaleTypes.CallMethodParams<"getSaleOpen">
    ): Promise<AyinPresaleTypes.CallMethodResult<"getSaleOpen">> => {
      return callMethod(
        AyinPresale,
        this,
        "getSaleOpen",
        params === undefined ? {} : params
      );
    },
  };

  async multicall<Calls extends AyinPresaleTypes.MultiCallParams>(
    calls: Calls
  ): Promise<AyinPresaleTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      AyinPresale,
      this,
      calls
    )) as AyinPresaleTypes.MultiCallResults<Calls>;
  }
}
