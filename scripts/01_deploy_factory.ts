import { Deployer, DeployFunction } from '@alephium/cli';
import {
  StakingAccountFactory,
  TokenPairFactory,
  VestingScheduleFactory,
} from '../artifacts/ts';

const deployFactory: DeployFunction<undefined> = async (
  deployer: Deployer
): Promise<void> => {
  const tokenPairTemplate = deployer.getDeployContractResult('TokenPair');
  const initialFields = {
    pairTemplateId: tokenPairTemplate.contractInstance.contractId,
    pairSize: 0n,
  };
  const tokenPairFactoryResult = await deployer.deployContract(
    TokenPairFactory,
    { initialFields: initialFields }
  );
  console.log(
    `TokenPairFactory contract address: ${tokenPairFactoryResult.contractInstance.address}, contract id: ${tokenPairFactoryResult.contractInstance.contractId}`
  );

  const vestingScheduleTemplate =
    deployer.getDeployContractResult('VestingSchedule');
  const vestingInitialFields = {
    vestingScheduleTemplateId:
      vestingScheduleTemplate.contractInstance.contractId,
  };

  const vestingScheduleFactoryResult = await deployer.deployContract(
    VestingScheduleFactory,
    {
      initialFields: vestingInitialFields,
    }
  );

  console.log(
    `VestingScheduleFactory contract address: ${vestingScheduleFactoryResult.contractInstance.address}, contract id: ${vestingScheduleFactoryResult.contractInstance.contractId}`
  );

  const stakingFactoryRes = await deployer.deployContract(
    StakingAccountFactory,
    {
      initialFields: {
        tokenId: '',
        rewardTokenId: '',
        stakingTemplateId:
          deployer.getDeployContractResult('StakingAccount').contractInstance
            .contractId,
      },
    }
  );
};

export default deployFactory;
