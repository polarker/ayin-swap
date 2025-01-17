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
import { default as LiquidStakingContractJson } from "../dex/liquid_staking.ral.json";

// Custom types for the contract
export namespace LiquidStakingTypes {
  export type Fields = {
    gainPerMillisecond: bigint;
    tokenId: HexString;
    symbol: HexString;
    name: HexString;
    updatedAt: bigint;
    currentXTokenPrice: bigint;
    rewardPool: bigint;
    totalSupply: bigint;
  };

  export type State = ContractState<Fields>;

  export type MintEvent = ContractEvent<{
    sender: Address;
    amount: bigint;
    newSupply: bigint;
  }>;
  export type BurnEvent = ContractEvent<{
    sender: Address;
    amount: bigint;
    newSupply: bigint;
  }>;
  export type PriceChangedEvent = ContractEvent<{ newPrice: bigint }>;

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
    getCurrentPrice: {
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
  LiquidStakingInstance,
  LiquidStakingTypes.Fields
> {
  at(address: string): LiquidStakingInstance {
    return new LiquidStakingInstance(address);
  }

  tests = {
    getSymbol: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getSymbol", params);
    },
    getName: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getName", params);
    },
    getDecimals: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getDecimals", params);
    },
    getTotalSupply: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getTotalSupply", params);
    },
    getCurrentPrice: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getCurrentPrice", params);
    },
    updatePrice: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "updatePrice", params);
    },
    stake: async (
      params: TestContractParams<LiquidStakingTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "stake", params);
    },
    unstake: async (
      params: TestContractParams<LiquidStakingTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "unstake", params);
    },
    topUpRewards: async (
      params: TestContractParams<LiquidStakingTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "topUpRewards", params);
    },
  };
}

// Use this object to test and deploy the contract
export const LiquidStaking = new Factory(
  Contract.fromJson(
    LiquidStakingContractJson,
    "",
    "3b5886d5aa5ffaefa5536f058fbc7e39d256cfcb0b5d9be72f47e134edea4a37"
  )
);

// Use this class to interact with the blockchain
export class LiquidStakingInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<LiquidStakingTypes.State> {
    return fetchContractState(LiquidStaking, this);
  }

  async getContractEventsCurrentCount(): Promise<number> {
    return getContractEventsCurrentCount(this.address);
  }

  subscribeMintEvent(
    options: SubscribeOptions<LiquidStakingTypes.MintEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      LiquidStaking.contract,
      this,
      options,
      "Mint",
      fromCount
    );
  }

  subscribeBurnEvent(
    options: SubscribeOptions<LiquidStakingTypes.BurnEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      LiquidStaking.contract,
      this,
      options,
      "Burn",
      fromCount
    );
  }

  subscribePriceChangedEvent(
    options: SubscribeOptions<LiquidStakingTypes.PriceChangedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvent(
      LiquidStaking.contract,
      this,
      options,
      "PriceChanged",
      fromCount
    );
  }

  subscribeAllEvents(
    options: SubscribeOptions<
      | LiquidStakingTypes.MintEvent
      | LiquidStakingTypes.BurnEvent
      | LiquidStakingTypes.PriceChangedEvent
    >,
    fromCount?: number
  ): EventSubscription {
    return subscribeContractEvents(
      LiquidStaking.contract,
      this,
      options,
      fromCount
    );
  }

  methods = {
    getSymbol: async (
      params?: LiquidStakingTypes.CallMethodParams<"getSymbol">
    ): Promise<LiquidStakingTypes.CallMethodResult<"getSymbol">> => {
      return callMethod(
        LiquidStaking,
        this,
        "getSymbol",
        params === undefined ? {} : params
      );
    },
    getName: async (
      params?: LiquidStakingTypes.CallMethodParams<"getName">
    ): Promise<LiquidStakingTypes.CallMethodResult<"getName">> => {
      return callMethod(
        LiquidStaking,
        this,
        "getName",
        params === undefined ? {} : params
      );
    },
    getDecimals: async (
      params?: LiquidStakingTypes.CallMethodParams<"getDecimals">
    ): Promise<LiquidStakingTypes.CallMethodResult<"getDecimals">> => {
      return callMethod(
        LiquidStaking,
        this,
        "getDecimals",
        params === undefined ? {} : params
      );
    },
    getTotalSupply: async (
      params?: LiquidStakingTypes.CallMethodParams<"getTotalSupply">
    ): Promise<LiquidStakingTypes.CallMethodResult<"getTotalSupply">> => {
      return callMethod(
        LiquidStaking,
        this,
        "getTotalSupply",
        params === undefined ? {} : params
      );
    },
    getCurrentPrice: async (
      params?: LiquidStakingTypes.CallMethodParams<"getCurrentPrice">
    ): Promise<LiquidStakingTypes.CallMethodResult<"getCurrentPrice">> => {
      return callMethod(
        LiquidStaking,
        this,
        "getCurrentPrice",
        params === undefined ? {} : params
      );
    },
  };

  async multicall<Calls extends LiquidStakingTypes.MultiCallParams>(
    calls: Calls
  ): Promise<LiquidStakingTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      LiquidStaking,
      this,
      calls
    )) as LiquidStakingTypes.MultiCallResults<Calls>;
  }
}
