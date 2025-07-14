import { DataSource } from 'typeorm';
import { ModulesFieldsValuesDefinition } from '../entities/modules_fields_values_definition.entity';

export const modulesFieldsValuesDefinitionProviders = [
  {
    provide: 'MODULESFIELDSVALUESDEFINITION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ModulesFieldsValuesDefinition),
    inject: ['DATA_SOURCE'],
  },
];