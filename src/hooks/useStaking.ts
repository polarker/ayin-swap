import { addressFromContractId, DUST_AMOUNT } from '@alephium/web3';
import { parseUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import {
  Stake,
  Staking,
  StakingAccount,
  StakingAccountTypes,
  StakingTypes,
  Unstake,
} from '../../artifacts/ts';
import { network } from '../utils/consts';
import { useAlephiumWallet } from './useAlephiumWallet';

export function useStaking() {
  const wallet = useAlephiumWallet();
  const [stakingState, setStakingState] = useState<StakingTypes.State>();
  const [stakingAccountState, setStakingAccountState] =
    useState<StakingAccountTypes.State>();

  const contractAddress = addressFromContractId(network.stakingId);
  const contract = Staking.at(contractAddress);

  const fetchStakingState = async () => {
    const state = await contract.fetchState();

    setStakingState(state);
  };

  const fetchStakingAccountState = async () => {
    if (wallet === undefined) return;
    const stakingAccResult = await contract.methods.getStakingAccount({
      args: {
        staker: wallet.address,
      },
    });

    const stakingAcc = StakingAccount.at(
      addressFromContractId(stakingAccResult.returns)
    );

    const state = await stakingAcc.fetchState();

    setStakingAccountState(state);
  };

  const stake = useCallback(
    async (ayinAmount: string) => {
      if (wallet === undefined) return;
      if (stakingState === undefined) return;

      const amount = parseUnits(ayinAmount, 18).toBigInt();

      await Stake.execute(wallet.signer, {
        initialFields: {
          staking: stakingState.contractId,
          amount,
        },
        attoAlphAmount: DUST_AMOUNT,
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
        attoAlphAmount: DUST_AMOUNT,
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

  useEffect(() => {
    if (wallet === undefined) return;

    fetchStakingState();
    fetchStakingAccountState();
  }, [wallet]);

  return { stakingState, stakingAccountState, stake, unstake };
}
