import { DataSource } from 'typeorm';
import { ModulesFields } from '../entities/modules_fields.entity';

export const modulesFieldsProviders = [
  {
    provide: 'MODULESFIELDS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ModulesFields),
    inject: ['DATA_SOURCE'],
  },
];