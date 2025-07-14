import { DataSource } from 'typeorm';
import { ModulesFieldsValues } from '../entities/modules_fields_values.entity';

export const modulesFieldsValuesProviders = [
  {
    provide: 'MODULESFIELDSVALUES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ModulesFieldsValues),
    inject: ['DATA_SOURCE'],
  },
];