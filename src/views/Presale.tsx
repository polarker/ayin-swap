import React, { useEffect, useState } from 'react';
import { useAyinPresale } from '../hooks/useAyinPresale';
import { useStaking } from '../hooks/useStaking';
import { useXAyin } from '../hooks/useXAyin';
import { bigIntToString } from '../utils/dex';

function Presale() {
  const [buyAmount, setBuyAmount] = useState('0.0');
  const { presaleState, ayinLeft, buyAyin, calculatePriceInAlph } =
    useAyinPresale();

  const { mintXAyin, burnXAyin, topUpRewards } = useXAyin();
  const { stakingAccountState } = useStaking();

  useEffect(() => console.log(stakingAccountState), [stakingAccountState]);

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    try {
      const number = Number.parseFloat(text);
      if (Number.isNaN(number)) return;
      setBuyAmount(number.toString());
    } catch {
      return;
    }
  };

  return (
    <div>
      <div>Ayin left: {ayinLeft}</div>
      <div>
        Alph per Ayin:{' '}
        {presaleState !== undefined &&
          bigIntToString(presaleState.fields.alphPerToken, 18)}
      </div>
      <input type="number" value={buyAmount} onChange={onAmountChange} />
      <div>
        Total price: {bigIntToString(calculatePriceInAlph(buyAmount), 18)}
      </div>
      <button onClick={() => buyAyin(buyAmount)}>Buy</button>
      <button onClick={() => mintXAyin(buyAmount)}>Mint xAyin</button>
      <button onClick={() => burnXAyin(buyAmount)}>Burn xAyin</button>
      <button onClick={() => topUpRewards(buyAmount)}>Topup rewards</button>
    </div>
  );
}

export default Presale;
