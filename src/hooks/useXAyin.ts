import { addressFromContractId, DUST_AMOUNT } from '@alephium/web3';
import { parseUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import {
  BurnXToken,
  LiquidStaking,
  LiquidStakingTypes,
  MintXToken,
  TopUpRewards,
} from '../../artifacts/ts';
import { network } from '../utils/consts';
import { bigIntToString } from '../utils/dex';
import { useAlephiumWallet, useAvailableBalances } from './useAlephiumWallet';

export function useXAyin() {
  const wallet = useAlephiumWallet();
  const [xAyinState, setXAyinState] = useState<LiquidStakingTypes.State>();
  const [ayinBalance, setAyinBalance] = useState('0.0');
  const [xAyinBalance, setXAyinBalance] = useState('0.0');
  const balance = useAvailableBalances();

  const contractAddress = addressFromContractId(network.xAyinId);
  const contract = LiquidStaking.at(contractAddress);

  useEffect(() => {
    if (balance === undefined) return;
    if (xAyinState === undefined) return;

    const { tokenId } = xAyinState.fields;
    const ayinBalance = balance.get(tokenId);
    const xAyinBalance = balance.get(contract.contractId);

    if (ayinBalance) {
      setAyinBalance(bigIntToString(ayinBalance, 18));
    }

    if (xAyinBalance) {
      setXAyinBalance(bigIntToString(xAyinBalance, 18));
    }
  }, [balance, xAyinState]);

  const fetchXAyinState = async () => {
    const state = await contract.fetchState();

    setXAyinState(state);
  };

  const mintXAyin = useCallback(
    async (ayinAmount: string) => {
      if (wallet === undefined) return;
      if (xAyinState === undefined) return;

      const amount = parseUnits(ayinAmount, 18).toBigInt();

      await MintXToken.execute(wallet.signer, {
        initialFields: {
          liquidStaking: xAyinState.contractId,
          amount,
        },
        attoAlphAmount: DUST_AMOUNT,
        tokens: [
          {
            id: xAyinState.fields.tokenId,
            amount,
          },
        ],
      });
    },
    [wallet, xAyinState]
  );

  const burnXAyin = useCallback(
    async (xAyinAmount: string) => {
      if (wallet === undefined) return;
      if (xAyinState === undefined) return;

      const xTokenAmount = parseUnits(xAyinAmount, 18).toBigInt();

      await BurnXToken.execute(wallet.signer, {
        initialFields: {
          liquidStaking: xAyinState.contractId,
          xTokenAmount,
        },
        attoAlphAmount: DUST_AMOUNT,
        tokens: [
          {
            id: xAyinState.contractId,
            amount: xTokenAmount,
          },
        ],
      });
    },
    [wallet, xAyinState]
  );

  const topUpRewards = useCallback(
    async (ayinAmount: string) => {
      if (wallet === undefined) return;
      if (xAyinState === undefined) return;

      const amount = parseUnits(ayinAmount, 18).toBigInt();

      await TopUpRewards.execute(wallet.signer, {
        initialFields: {
          liquidStaking: xAyinState.contractId,
          amount,
        },
        attoAlphAmount: DUST_AMOUNT,
        tokens: [
          {
            id: xAyinState.fields.tokenId,
            amount,
          },
        ],
      });
    },
    [wallet, xAyinState]
  );
  useEffect(() => {
    if (wallet === undefined) return;

    fetchXAyinState();
  }, [wallet]);

  return {
    xAyinState,
    ayinBalance,
    xAyinBalance,
    mintXAyin,
    burnXAyin,
    topUpRewards,
  };
}
