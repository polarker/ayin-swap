import { addressFromContractId, DUST_AMOUNT, ONE_ALPH } from '@alephium/web3';
import { parseUnits } from 'ethers/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { AyinPresale, AyinPresaleTypes, BuyAyin } from '../contracts/ts';
import { network } from '../utils/consts';
import { bigIntToString } from '../utils/dex';
import { useAlephiumWallet } from './useAlephiumWallet';

export function useAyinPresale() {
  const [presaleState, setPresaleState] = useState<AyinPresaleTypes.State>();
  const [ayinLeft, setAyinLeft] = useState('');
  const wallet = useAlephiumWallet();

  const contractAddress = addressFromContractId(network.ayinPresaleId);
  const contract = AyinPresale.at(contractAddress);

  const fetchPresaleState = async () => {
    const state = await contract.fetchState();

    setPresaleState(state);
  };

  const getAyinLeft = async () => {
    const ayinLeft = await contract.methods.getTokensLeft();

    setAyinLeft(bigIntToString(ayinLeft.returns, 18));
  };

  const calculatePriceInAlph = useCallback(
    (ayinAmount: string) => {
      if (presaleState === undefined) return 0n;

      const alphPerToken = presaleState.fields.alphPerToken;
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
          presale: presaleState.contractId,
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
