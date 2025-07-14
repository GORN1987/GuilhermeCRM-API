import {
  Controller,
  Post,
  UseGuards,
  Request,
  Inject,
  Get,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { ModulesFieldsValues } from '../entities/modules_fields_values.entity';
import { v6 } from 'uuid';
import { getManager } from 'typeorm';
import { ModulesFields } from '../entities/modules_fields.entity';
import { ModulesFieldsValuesDefinition } from '../entities/modules_fields_values_definition.entity';
import { Modules } from '../entities/modules.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('modules_fields_values')
export class ModulesFieldsValuesController {
  constructor(
    @Inject('MODULESFIELDSVALUES_REPOSITORY')
    private c: Repository<ModulesFieldsValues>,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {}
  @Get('fields/joined-latest-fields')
  async getLatestJoinedFieldsValuesWithFieldLabel(): Promise<any> {
    // Join ModulesFieldsValues (mfv) with ModulesFields (mf) to get field label
    // Return 20 latest records regardless of module
    return await this.dataSource
      .createQueryBuilder(ModulesFieldsValues, 'mfv')
      .leftJoin(
        ModulesFields,
        'mf',
        'mfv.field_name = mf.field_name AND mfv.module = mf.module',
      )
      .select([
        'mfv.module AS module_name',
        'mfv.field_name AS field_name',
        'mf.label AS field_label',
        'mfv.record_id as record_id',
        'mfv.value AS value',
        'mfv.created_at AS created_at',
      ])
      .orderBy('mfv.created_at', 'DESC')
      .limit(20)
      .getRawMany();
  }

  @Get(':module/:id')
  async getModulesFields(@Param() params): Promise<any> {
    return await this.c.findBy({
      module: params['module'],
      record_id: params['id'],
    });
  }

  @Get(':module')
  async getModulesFieldsValues(@Param() params): Promise<any> {
    return await this.c.findBy({
      module: params['module'],
    });
  }

  @Post(':module')
  async saveRecord(@Body() body, @Param() params): Promise<any> {
    let idNewRecord = v6();
    Object.keys(body).forEach(async (key) => {
      const modulesFieldsValues = new ModulesFieldsValues();
      modulesFieldsValues.module = params['module'];
      modulesFieldsValues.record_id = idNewRecord;
      modulesFieldsValues.field_name = body[key].field_name;
      modulesFieldsValues.value = body[key].value;
      await this.c.insert(modulesFieldsValues);
    });
  }

@Put(':module/:id')
async updateModuleFields(@Body() body: any[], @Param() params) {
  // Fetch all existing field values for the record and module
  const existingFields = await this.c.findBy({
    record_id: params['id'],
    module: params['module'],
  });

  // Create a map for quick lookup of existing field names
  const existingFieldNames = new Set(existingFields.map(fv => fv.field_name));

  // Update existing fields and collect new fields to insert
  for (const bodyValue of body) {
    const existingField = existingFields.find(fv => fv.field_name === bodyValue.field_name);
    if (existingField) {
      // Update value if changed
      if (existingField.value !== bodyValue.value) {
        existingField.value = bodyValue.value;
        await this.c.save(existingField);
      }
    } else {
      // Insert new field value
      const newFieldValue = new ModulesFieldsValues();
      newFieldValue.module = params['module'];
      newFieldValue.record_id = params['id'];
      newFieldValue.field_name = bodyValue.field_name;
      newFieldValue.value = bodyValue.value;
      await this.c.save(newFieldValue);
    }
  }
}

  // ... other methods ...

    @Get('fields/joined/:module')
  async getJoinedModuleFields(@Param('module') module: string): Promise<any> {
    return await this.dataSource
      .createQueryBuilder(ModulesFields, 'mf')
      .leftJoin(
        ModulesFieldsValuesDefinition,
        'mfd',
        'mf.field_name = mfd.field_name AND mf.module = mfd.module'
      )
      .leftJoin(
        Modules,
        'm',
        'mf.module = m.name'
      )
      .leftJoin(
        ModulesFieldsValues,
        'mfv',
        'mf.field_name = mfv.field_name AND mf.module = mfv.module'
      )
      .select([
        'mf.field_name AS field_name',
        'mf.label AS label',
        'mf.module AS module',
        'mfd.type AS type',
        'm.label AS module_label',
        'mfv.value AS value',
        'mfv.record_id AS record_id',
        'mfv.created_at AS value_created_at'
      ])
      .where('mf.module = :module', { module })
      .getRawMany();
  }
}
