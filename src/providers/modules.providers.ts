import { DataSource } from 'typeorm';
import { Modules } from '../entities/modules.entity';

export const modulesProviders = [
  {
    provide: 'MODULE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Modules),
    inject: ['DATA_SOURCE'],
  },
];