import { Deployer, DeployFunction } from '@alephium/cli';
import { TokenPairFactory, VestingScheduleFactory } from '../src/contracts/ts';

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
    owner_: deployer.account.address,
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
};

export default deployFactory;
