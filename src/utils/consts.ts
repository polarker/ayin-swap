import { NetworkId } from '@alephium/web3';
import { loadDeployments } from '../contracts/ts/deployments';

export interface NetworkConfig {
  groupIndex: number;
  factoryId: string;
  routerId: string;
  ayinTokenId: string;
  ayinPresaleId: string;
  xAyinId: string;
  stakingId: string;
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
      ayinTokenId: deployments.contracts.AyinToken.contractInstance.contractId,
      ayinPresaleId:
        deployments.contracts.AyinPresale.contractInstance.contractId,
      xAyinId: deployments.contracts.LiquidStaking.contractInstance.contractId,
      stakingId: deployments.contracts.Staking.contractInstance.contractId,
    };
  } catch (error) {
    console.log(`Failed to load deployments on ${networkId}, error: ${error}`);
    throw error;
  }
}
