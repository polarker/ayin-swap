import { DUST_AMOUNT, ONE_ALPH } from '@alephium/web3';
import { parseUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { AyinPresaleTypes, BuyAyin } from '../contracts/ts';
import { network } from '../utils/consts';
import { bigIntToString } from '../utils/dex';
import { useAlephiumWallet } from './useAlephiumWallet';

export function useAyinPresale() {
  const [presaleState, setPresaleState] = useState<AyinPresaleTypes.Fields>();
  const [ayinLeft, setAyinLeft] = useState('');
  const wallet = useAlephiumWallet();

  const { ayinPresale } = network;

  const fetchPresaleState = async () => {
    const state = await ayinPresale.fetchState();

    setPresaleState(state.fields);
  };

  const getAyinLeft = async () => {
    const ayinLeft = await ayinPresale.methods.getTokensLeft();

    setAyinLeft(bigIntToString(ayinLeft.returns, 18));
  };

  const calculatePriceInAlph = useCallback(
    (ayinAmount: string) => {
      if (presaleState === undefined) return 0n;

      const alphPerToken = presaleState.alphPerToken;
      const _ayinAmount = parseUnits(ayinAmount, 18).toBigInt();

      const price = (alphPerToken * _ayinAmount) / ONE_ALPH;

      return price;
    },
    [presaleState]
  );

  const buyAyin = useCallback(
    async (ayinAmount: string) => {
      if (presaleState === undefined) return;
      if (wallet === undefined || wallet.signer.explorerProvider === undefined)
        return;

      const price = calculatePriceInAlph(ayinAmount);
      const _amount = parseUnits(ayinAmount, 18).toBigInt();

      await BuyAyin.execute(wallet.signer, {
        initialFields: {
          presale: ayinPresale.contractId,
          amount: _amount,
        },
        attoAlphAmount: price + DUST_AMOUNT,
      });
    },
    [presaleState, wallet]
  );

  useEffect(() => {
    if (wallet === undefined) return;

    fetchPresaleState();
    getAyinLeft();
  }, [wallet]);

  return { presaleState, ayinLeft, calculatePriceInAlph, buyAyin };
}
