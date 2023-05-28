import {
  addressFromContractId,
  binToHex,
  DUST_AMOUNT,
  encodeAddress,
  ONE_ALPH,
  subContractId,
} from '@alephium/web3';
import { parseUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import {
  ClaimRewards,
  Stake,
  Staking,
  StakingAccount,
  StakingAccountTypes,
  StakingTypes,
  Unstake,
} from '../contracts/ts';
import { network } from '../utils/consts';
import { bigIntToString } from '../utils/dex';
import { useAlephiumWallet, useAvailableBalances } from './useAlephiumWallet';

export function useStaking() {
  const wallet = useAlephiumWallet();
  const [stakingState, setStakingState] = useState<StakingTypes.State>();
  const [lpTokenBalance, setLpTokenBalance] = useState('0.0');
  const [stakingAccountState, setStakingAccountState] =
    useState<StakingAccountTypes.State>();
  const [currentRewards, setCurrentRewards] = useState('0.0');

  const balance = useAvailableBalances();

  const contractAddress = addressFromContractId(network.stakingId);
  const contract = Staking.at(contractAddress);

  useEffect(() => {
    if (balance === undefined) return;
    if (stakingState === undefined) return;

    const { tokenId } = stakingState.fields;
    const lpBalance = balance.get(tokenId);

    if (lpBalance) {
      setLpTokenBalance(bigIntToString(lpBalance, 18));
    }
  }, [balance, stakingState]);

  useEffect(() => {
    if (stakingAccountState === undefined) return;
    if (stakingState === undefined) return;

    const { rewards, amountStaked } = stakingAccountState.fields;

    const { rewardRate, totalAmountStaked, lastUpdateTime } =
      stakingState.fields;

    const interval = setInterval(() => {
      const timeDelta = BigInt(Date.now()) - lastUpdateTime;

      const earnedRewards =
        ((amountStaked * rewardRate) / totalAmountStaked) * timeDelta + rewards;

      setCurrentRewards(bigIntToString(earnedRewards, 18));
    }, 1000);

    return () => clearInterval(interval);
  }, [stakingState, stakingAccountState]);

  const getStakingAccount = (address: string) => {
    const path = binToHex(encodeAddress(address));

    const stakingAccountId = subContractId(
      network.stakingId,
      path,
      network.groupIndex
    );

    const stakingAcc = StakingAccount.at(
      addressFromContractId(stakingAccountId)
    );

    return stakingAcc;
  };

  const fetchStakingState = async () => {
    const state = await contract.fetchState();

    setStakingState(state);
  };

  const fetchStakingAccountState = async () => {
    if (wallet === undefined || wallet.signer.explorerProvider === undefined)
      return;

    const stakingAcc = getStakingAccount(wallet.address);

    try {
      const res = await stakingAcc.fetchState();
      setStakingAccountState(res);
    } catch {
      void 0;
    }
  };

  const stake = useCallback(
    async (ayinAmount: string) => {
      if (wallet === undefined) return;
      if (stakingState === undefined) return;

      const alphAmount =
        stakingAccountState !== undefined
          ? DUST_AMOUNT
          : ONE_ALPH + DUST_AMOUNT;

      const amount = parseUnits(ayinAmount, 18).toBigInt();

      await Stake.execute(wallet.signer, {
        initialFields: {
          staking: stakingState.contractId,
          amount,
        },
        attoAlphAmount: alphAmount,
        tokens: [
          {
            id: stakingState.fields.tokenId,
            amount,
          },
        ],
      });
    },
    [wallet, stakingState]
  );

  const unstake = useCallback(
    async (ayinAmount: string) => {
      if (wallet === undefined) return;
      if (stakingState === undefined) return;

      const amount = parseUnits(ayinAmount, 18).toBigInt();

      await Unstake.execute(wallet.signer, {
        initialFields: {
          staking: stakingState.contractId,
          amount,
        },
      });
    },
    [wallet, stakingState]
  );

  const claimRewards = useCallback(async () => {
    if (wallet === undefined) return;
    if (stakingAccountState === undefined) return;

    await ClaimRewards.execute(wallet.signer, {
      initialFields: {
        staking: contract.contractId,
      },
      attoAlphAmount: DUST_AMOUNT,
    });
  }, [wallet, stakingAccountState]);

  useEffect(() => {
    if (wallet === undefined) return;

    fetchStakingState();
    fetchStakingAccountState();
  }, [wallet]);

  return {
    stakingState,
    stakingAccountState,
    currentRewards,
    lpTokenBalance,
    stake,
    unstake,
    claimRewards,
  };
}
