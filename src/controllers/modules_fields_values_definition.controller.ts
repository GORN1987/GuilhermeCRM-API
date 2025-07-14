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
import { Repository } from 'typeorm';
import { ModulesFieldsValuesDefinition } from '../entities/modules_fields_values_definition.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('modules_fields_values_definition')
export class ModulesFieldsValuesDefinitionController {
  constructor(
    @Inject('MODULESFIELDSVALUES_REPOSITORY')
    private c: Repository<ModulesFieldsValuesDefinition>,
  ) {}

  @Get(':module')
  async getModulesFields(@Param() params): Promise<any> {
    return await this.c.findBy({
      module: params['module']
    });
  }

  @Post(':module')
  async saveRecord(@Body() body, @Param() params): Promise<any> {

  }

  @Put(':module/:id')
  updateModuleFields(@Body() body: any[], @Param() params) {

  }
}
