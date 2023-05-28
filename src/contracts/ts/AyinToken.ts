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
import { default as AyinTokenContractJson } from "../ayin/AyinToken.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace AyinTokenTypes {
  export type Fields = {
    totalSupply: bigint;
    owner_: Address;
  };

  export type State = ContractState<Fields>;

  export type MintEvent = ContractEvent<{ to: Address; amount: bigint }>;
  export type BurnEvent = ContractEvent<{ from: Address; amount: bigint }>;

  export interface CallMethodTable {
    getSymbol: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getName: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getDecimals: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTotalSupply: {
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
  AyinTokenInstance,
  AyinTokenTypes.Fields
> {
  consts = { PermissionsErrorCodes: { Forbidden: BigInt(0) } };

  at(address: string): AyinTokenInstance {
    return new AyinTokenInstance(address);
  }

  tests = {
    getSymbol: async (
      params: Omit<TestContractParams<AyinTokenTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getSymbol", params);
    },
    getName: async (
      params: Omit<TestContractParams<AyinTokenTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getName", params);
    },
    getDecimals: async (
      params: Omit<TestContractParams<AyinTokenTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getDecimals", params);
    },
    getTotalSupply: async (
      params: Omit<TestContractParams<AyinTokenTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getTotalSupply", params);
    },
    onlyOwner: async (
      params: TestContractParams<AyinTokenTypes.Fields, { caller: Address }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "onlyOwner", params);
    },
    changeOwner: async (
      params: TestContractParams<AyinTokenTypes.Fields, { newOwner: Address }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "changeOwner", params);
    },
    mint: async (
      params: TestContractParams<
        AyinTokenTypes.Fields,
        { to: Address; amount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "mint", params);
    },
    burn: async (
      params: TestContractParams<AyinTokenTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "burn", params);
    },
  };
}

// Use this object to test and deploy the contract
export const AyinToken = new Factory(
  Contract.fromJson(
    AyinTokenContractJson,
    "",
    "252545ee6c280974e5b97a82afe89811e2ba606243c02025d33225622743c7a9"
  )
);

// Use this class to interact with the blockchain
export class AyinTokenInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<AyinTokenTypes.State> {
    return fetchContractState(AyinToken, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeMintEvent(
    options: SubscribeOptions<AyinTokenTypes.MintEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      AyinToken.contract,
      this,
      options,
      "Mint",
      fromCount
    );
  }

  subscribeBurnEvent(
    options: SubscribeOptions<AyinTokenTypes.BurnEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      AyinToken.contract,
      this,
      options,
      "Burn",
      fromCount
    );
  }

  subscribeAllEvents(
    options: SubscribeOptions<
      AyinTokenTypes.MintEvent | AyinTokenTypes.BurnEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      AyinToken.contract,
      this,
      options,
      fromCount
    );
  }

  methods = {
    getSymbol: async (
      params?: AyinTokenTypes.CallMethodParams<"getSymbol">
    ): Promise<AyinTokenTypes.CallMethodResult<"getSymbol">> => {
      return callMethod(
        AyinToken,
        this,
        "getSymbol",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getName: async (
      params?: AyinTokenTypes.CallMethodParams<"getName">
    ): Promise<AyinTokenTypes.CallMethodResult<"getName">> => {
      return callMethod(
        AyinToken,
        this,
        "getName",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getDecimals: async (
      params?: AyinTokenTypes.CallMethodParams<"getDecimals">
    ): Promise<AyinTokenTypes.CallMethodResult<"getDecimals">> => {
      return callMethod(
        AyinToken,
        this,
        "getDecimals",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    getTotalSupply: async (
      params?: AyinTokenTypes.CallMethodParams<"getTotalSupply">
    ): Promise<AyinTokenTypes.CallMethodResult<"getTotalSupply">> => {
      return callMethod(
        AyinToken,
        this,
        "getTotalSupply",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<Calls extends AyinTokenTypes.MultiCallParams>(
    calls: Calls
  ): Promise<AyinTokenTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      AyinToken,
      this,
      calls,
      getContractByCodeHash
    )) as AyinTokenTypes.MultiCallResults<Calls>;
  }
}