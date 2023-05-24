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
import { default as LiquidStakingContractJson } from "../ayin/LiquidStaking.ral.json";

// Custom types for the contract
export namespace LiquidStakingTypes {
  export type Fields = {
    tokenId: HexString;
    symbol: HexString;
    name: HexString;
    gainPerMillisecond: bigint;
    updatedAt: bigint;
    currentXTokenPrice: bigint;
    rewardPool: bigint;
    totalSupply: bigint;
    owner_: Address;
    paused_: boolean;
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
    getCurrentRewardPerMillisecond: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getCurrentPrice: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTokenId: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
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
  consts = {
    PermissionsErrorCodes: { Forbidden: BigInt(0) },
    PauseableErrorCodes: { Paused: BigInt(0) },
  };

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
    pause: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "pause", params);
    },
    unpause: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "unpause", params);
    },
    whenNotPaused: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "whenNotPaused", params);
    },
    onlyOwner: async (
      params: TestContractParams<LiquidStakingTypes.Fields, { caller: Address }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "onlyOwner", params);
    },
    changeOwner: async (
      params: TestContractParams<
        LiquidStakingTypes.Fields,
        { newOwner: Address }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "changeOwner", params);
    },
    getCurrentRewardPerMillisecond: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getCurrentRewardPerMillisecond", params);
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
    mint: async (
      params: TestContractParams<LiquidStakingTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "mint", params);
    },
    burn: async (
      params: TestContractParams<
        LiquidStakingTypes.Fields,
        { xTokenAmount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "burn", params);
    },
    topUpRewards: async (
      params: TestContractParams<LiquidStakingTypes.Fields, { amount: bigint }>
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "topUpRewards", params);
    },
    setGainPerMillisecond: async (
      params: TestContractParams<
        LiquidStakingTypes.Fields,
        { newGainPerMillisecond: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "setGainPerMillisecond", params);
    },
    getTokenId: async (
      params: Omit<
        TestContractParams<LiquidStakingTypes.Fields, never>,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getTokenId", params);
    },
  };
}

// Use this object to test and deploy the contract
export const LiquidStaking = new Factory(
  Contract.fromJson(
    LiquidStakingContractJson,
    "",
    "5324e706f47416fa7e04ce35b164ee0915898de9fbfcacda2f9075aaeddf7541"
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
    getCurrentRewardPerMillisecond: async (
      params?: LiquidStakingTypes.CallMethodParams<"getCurrentRewardPerMillisecond">
    ): Promise<
      LiquidStakingTypes.CallMethodResult<"getCurrentRewardPerMillisecond">
    > => {
      return callMethod(
        LiquidStaking,
        this,
        "getCurrentRewardPerMillisecond",
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
    getTokenId: async (
      params?: LiquidStakingTypes.CallMethodParams<"getTokenId">
    ): Promise<LiquidStakingTypes.CallMethodResult<"getTokenId">> => {
      return callMethod(
        LiquidStaking,
        this,
        "getTokenId",
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
