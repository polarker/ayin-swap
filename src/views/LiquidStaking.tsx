import { useState } from 'react';
import { useXAyin } from '../hooks/useXAyin';
import { bigIntToString } from '../utils/dex';

function LiquidStaking() {
  const {
    ayinBalance,
    xAyinBalance,
    xAyinState,
    mintXAyin,
    burnXAyin,
    topUpRewards,
  } = useXAyin();
  const [amount, setAmount] = useState('0.0');

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    try {
      const number = Number.parseFloat(text);
      if (Number.isNaN(number)) return;
      setAmount(number.toString());
    } catch {
      return;
    }
  };

  const xAyinPrice = bigIntToString(xAyinState?.currentXTokenPrice ?? 0n, 18);

  return (
    <div>
      <div>$AYIN balance: {ayinBalance}</div>
      <div>xAyin balance: {xAyinBalance}</div>
      <div>1 XAYIN = {xAyinPrice} $AYIN</div>
      <input type="number" value={amount} onChange={onAmountChange} />
      <button onClick={() => mintXAyin(amount)}>Mint xAyin</button>
      <button onClick={() => burnXAyin(amount)}>Burn xAyin</button>
      <button onClick={() => topUpRewards(amount)}>Topup rewards</button>
    </div>
  );
}

export default LiquidStaking;
