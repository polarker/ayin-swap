import { Deployer, DeployFunction } from '@alephium/cli';
import { Settings } from '../alephium.config';
import { VestingScheduleFactory } from '../src/contracts/ts';

const deployFactory: DeployFunction<Settings> = async (
  deployer: Deployer
): Promise<void> => {
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
