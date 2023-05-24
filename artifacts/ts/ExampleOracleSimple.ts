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
import { default as ExampleOracleSimpleContractJson } from "../examples/ExampleOracleSimple.ral.json";

// Custom types for the contract
export namespace ExampleOracleSimpleTypes {
  export type Fields = {
    pair: HexString;
    price0CumulativeLast: bigint;
    price1CumulativeLast: bigint;
    blockTimeStampLast: bigint;
    price0Average: bigint;
    price1Average: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    fullMul: {
      params: CallContractParams<{ x: bigint; y: bigint }>;
      result: CallContractResult<[bigint, bigint]>;
    };
    mulDiv: {
      params: CallContractParams<{ a: bigint; b: bigint; denominator: bigint }>;
      result: CallContractResult<bigint>;
    };
    fraction: {
      params: CallContractParams<{ numerator: bigint; denominator: bigint }>;
      result: CallContractResult<bigint>;
    };
    consult: {
      params: CallContractParams<{ tokenId: HexString; amountIn: bigint }>;
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
  ExampleOracleSimpleInstance,
  ExampleOracleSimpleTypes.Fields
> {
  consts = {
    Resolution: BigInt(112),
    Period: BigInt(86400),
    ErrorCodes: {
      FullDivOverflow: BigInt(0),
      DivByZero: BigInt(1),
      FractionOverflow: BigInt(2),
      PeriodNotElapsed: BigInt(3),
      InvalidToken: BigInt(4),
    },
  };

  at(address: string): ExampleOracleSimpleInstance {
    return new ExampleOracleSimpleInstance(address);
  }

  tests = {
    fullMul: async (
      params: TestContractParams<
        ExampleOracleSimpleTypes.Fields,
        { x: bigint; y: bigint }
      >
    ): Promise<TestContractResult<[bigint, bigint]>> => {
      return testMethod(this, "fullMul", params);
    },
    mulDiv: async (
      params: TestContractParams<
        ExampleOracleSimpleTypes.Fields,
        { a: bigint; b: bigint; denominator: bigint }
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "mulDiv", params);
    },
    fraction: async (
      params: TestContractParams<
        ExampleOracleSimpleTypes.Fields,
        { numerator: bigint; denominator: bigint }
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "fraction", params);
    },
    currentCumulativePrices: async (
      params: TestContractParams<
        ExampleOracleSimpleTypes.Fields,
        { currentBlockTimeStamp: bigint }
      >
    ): Promise<TestContractResult<[bigint, bigint]>> => {
      return testMethod(this, "currentCumulativePrices", params);
    },
    update: async (
      params: Omit<
        TestContractParams<ExampleOracleSimpleTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "update", params);
    },
    consult: async (
      params: TestContractParams<
        ExampleOracleSimpleTypes.Fields,
        { tokenId: HexString; amountIn: bigint }
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "consult", params);
    },
  };
}

// Use this object to test and deploy the contract
export const ExampleOracleSimple = new Factory(
  Contract.fromJson(
    ExampleOracleSimpleContractJson,
    "",
    "db728f2254d74eb30dbf85b4dc55e0d5a00bdc0c7b09c6cd94d8b2128f220bc8"
  )
);

// Use this class to interact with the blockchain
export class ExampleOracleSimpleInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<ExampleOracleSimpleTypes.State> {
    return fetchContractState(ExampleOracleSimple, this);
  }

  methods = {
    fullMul: async (
      params: ExampleOracleSimpleTypes.CallMethodParams<"fullMul">
    ): Promise<ExampleOracleSimpleTypes.CallMethodResult<"fullMul">> => {
      return callMethod(ExampleOracleSimple, this, "fullMul", params);
    },
    mulDiv: async (
      params: ExampleOracleSimpleTypes.CallMethodParams<"mulDiv">
    ): Promise<ExampleOracleSimpleTypes.CallMethodResult<"mulDiv">> => {
      return callMethod(ExampleOracleSimple, this, "mulDiv", params);
    },
    fraction: async (
      params: ExampleOracleSimpleTypes.CallMethodParams<"fraction">
    ): Promise<ExampleOracleSimpleTypes.CallMethodResult<"fraction">> => {
      return callMethod(ExampleOracleSimple, this, "fraction", params);
    },
    consult: async (
      params: ExampleOracleSimpleTypes.CallMethodParams<"consult">
    ): Promise<ExampleOracleSimpleTypes.CallMethodResult<"consult">> => {
      return callMethod(ExampleOracleSimple, this, "consult", params);
    },
  };

  async multicall<Calls extends ExampleOracleSimpleTypes.MultiCallParams>(
    calls: Calls
  ): Promise<ExampleOracleSimpleTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      ExampleOracleSimple,
      this,
      calls
    )) as ExampleOracleSimpleTypes.MultiCallResults<Calls>;
  }
}
