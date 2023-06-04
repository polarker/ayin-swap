import { NetworkId } from '@alephium/web3';
import {
  AyinPresaleInstance,
  AyinTokenInstance,
  LiquidStakingInstance,
  StakingInstance,
} from '../contracts/ts';
import { loadDeployments } from '../contracts/ts/deployments';

export interface NetworkConfig {
  groupIndex: number;
  factoryId: string;
  routerId: string;
  ayinToken: AyinTokenInstance;
  ayinPresale: AyinPresaleInstance;
  xAyin: LiquidStakingInstance;
  staking: StakingInstance;
}

export const networkId: NetworkId = process.env.REACT_APP_NETWORK as NetworkId;

export const network: NetworkConfig = getNetworkConfig(networkId);

export const PollingInterval = networkId === 'devnet' ? 1 : 5; // seconds

function getNetworkConfig(networkId: NetworkId): NetworkConfig {
  try {
    const deployments = loadDeployments(networkId);
    return {
      groupIndex: deployments.contracts.Router.contractInstance.groupIndex,
      factoryId:
        deployments.contracts.TokenPairFactory.contractInstance.contractId,
      routerId: deployments.contracts.Router.contractInstance.contractId,
      ayinToken: deployments.contracts.AyinToken.contractInstance,
      ayinPresale: deployments.contracts.AyinPresale.contractInstance,
      xAyin: deployments.contracts.LiquidStaking.contractInstance,
      staking: deployments.contracts.Staking.contractInstance,
    };
  } catch (error) {
    console.log(`Failed to load deployments on ${networkId}, error: ${error}`);
    throw error;
  }
}
