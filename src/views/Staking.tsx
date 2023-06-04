import { useState } from 'react';
import { useStaking } from '../hooks/useStaking';
import { bigIntToString } from '../utils/dex';

function Staking() {
  const {
    stakingAccountState,
    lpTokenBalance,
    currentRewards,
    stake,
    unstake,
    claimRewards,
  } = useStaking();
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

  return (
    <div>
      <div>AYIN-ALPH LP tokens balance: {lpTokenBalance}</div>
      <div>
        LP staked: {bigIntToString(stakingAccountState?.amountStaked ?? 0n, 18)}
      </div>
      <input type="number" value={amount} onChange={onAmountChange} />
      <div>Rewards: {currentRewards} $AYIN</div>
      <button onClick={() => claimRewards()}>Claim rewards</button>
      <button onClick={() => stake(amount)}>Stake</button>
      <button onClick={() => unstake(amount)}>Unstake</button>
    </div>
  );
}

export default Staking;
