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
import { default as AyinPresaleContractJson } from "../ayin/AyinPresale.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace AyinPresaleTypes {
  export type Fields = {
    ayinToken: HexString;
    tokensForSale: bigint;
    alphPerToken: bigint;
    saleOpen: boolean;
    tokensSold: bigint;
    alphBalance: bigint;
    owner_: Address;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getAyinTokenId: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getAlphBalance: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTokensLeft: {
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
  consts = {
    PermissionsErrorCodes: { Forbidden: BigInt(0) },
    ErrorCodes: { SaleNotOpen: BigInt(0), NotEnoughTokens: BigInt(1) },
  };

  at(address: string): AyinPresaleInstance {
    return new AyinPresaleInstance(address);
  }

  tests = {
    onlyOwner: async (
      params: TestContractParams<AyinPresaleTypes.Fields, { caller: Address }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "onlyOwner", params);
    },
    changeOwner: async (
      params: TestContractParams<AyinPresaleTypes.Fields, { newOwner: Address }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "changeOwner", params);
    },
    getAyinTokenId: async (
      params: Omit<
        TestContractParams<AyinPresaleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getAyinTokenId", params);
    },
    getAlphBalance: async (
      params: Omit<
        TestContractParams<AyinPresaleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getAlphBalance", params);
    },
    getTokensLeft: async (
      params: Omit<
        TestContractParams<AyinPresaleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getTokensLeft", params);
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
    depositAyin: async (
      params: TestContractParams<AyinPresaleTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "depositAyin", params);
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
    withdrawToken_: async (
      params: TestContractParams<
        AyinPresaleTypes.Fields,
        { caller: Address; tokenId: HexString; amount: bigint; sendTo: Address }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "withdrawToken_", params);
    },
    withdrawAlph: async (
      params: TestContractParams<
        AyinPresaleTypes.Fields,
        { amount: bigint; sendTo: Address }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "withdrawAlph", params);
    },
    withdrawAyin: async (
      params: TestContractParams<
        AyinPresaleTypes.Fields,
        { amount: bigint; sendTo: Address }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "withdrawAyin", params);
    },
    destroy: async (
      params: TestContractParams<
        AyinPresaleTypes.Fields,
        { remainingBalancesTo: Address }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "destroy", params);
    },
  };
}

// Use this object to test and deploy the contract
export const AyinPresale = new Factory(
  Contract.fromJson(
    AyinPresaleContractJson,
    "",
    "39002e705ef8f60a7238bbed5a07ef852b2f7a6ddd73255e17a5b616aa8c1b74"
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
    getAyinTokenId: async (
      params?: AyinPresaleTypes.CallMethodParams<"getAyinTokenId">
    ): Promise<AyinPresaleTypes.CallMethodResult<"getAyinTokenId">> => {
      return callMethod(
        AyinPresale,
        this,
        "getAyinTokenId",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getAlphBalance: async (
      params?: AyinPresaleTypes.CallMethodParams<"getAlphBalance">
    ): Promise<AyinPresaleTypes.CallMethodResult<"getAlphBalance">> => {
      return callMethod(
        AyinPresale,
        this,
        "getAlphBalance",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTokensLeft: async (
      params?: AyinPresaleTypes.CallMethodParams<"getTokensLeft">
    ): Promise<AyinPresaleTypes.CallMethodResult<"getTokensLeft">> => {
      return callMethod(
        AyinPresale,
        this,
        "getTokensLeft",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getAlphPerToken: async (
      params?: AyinPresaleTypes.CallMethodParams<"getAlphPerToken">
    ): Promise<AyinPresaleTypes.CallMethodResult<"getAlphPerToken">> => {
      return callMethod(
        AyinPresale,
        this,
        "getAlphPerToken",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getSaleOpen: async (
      params?: AyinPresaleTypes.CallMethodParams<"getSaleOpen">
    ): Promise<AyinPresaleTypes.CallMethodResult<"getSaleOpen">> => {
      return callMethod(
        AyinPresale,
        this,
        "getSaleOpen",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends AyinPresaleTypes.MultiCallParams>(
    calls: Calls
  ): Promise<AyinPresaleTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      AyinPresale,
      this,
      calls,
      getContractByCodeHash
    )) as AyinPresaleTypes.MultiCallResults<Calls>;
  }
}
