import React, { useState } from 'react';
import { useAyinPresale } from '../hooks/useAyinPresale';
import { bigIntToString } from '../utils/dex';

function Presale() {
  const [buyAmount, setBuyAmount] = useState('0.0');
  const { presaleState, ayinLeft, buyAyin, calculatePriceInAlph } =
    useAyinPresale();

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
        Total price: {bigIntToString(calculatePriceInAlph(buyAmount), 18)} ALPH
      </div>
      <button onClick={() => buyAyin(buyAmount)}>Buy</button>
    </div>
  );
}

export default Presale;
