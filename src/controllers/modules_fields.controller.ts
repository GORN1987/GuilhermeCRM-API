import { Controller, Post, Body, Inject, Get, Param,  UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ModulesFields } from '../entities/modules_fields.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller("modules_fields")
export class ModulesFieldsController {

  constructor(
    @Inject('MODULESFIELDS_REPOSITORY')
    private c: Repository<ModulesFields>
  )
  {}

  @Get(':module')
  async getModulesFields(@Param() params): Promise<any> {
    return await this.c.findBy({module: params['module']});
  }

  @Post(':module')
  async saveRecord(@Body() body, @Param() params): Promise<any> {
    Object.keys(body).forEach(async (key) => {
      let moduleFields;
      if (body[key].id) {
        moduleFields = await this.c.findOneBy({id: body[key].id});
        moduleFields.label = body[key].label;
        moduleFields.type = body[key].type; // Update type
        await this.c.save(moduleFields);
      } else {
        moduleFields = new ModulesFields();
        moduleFields.module = params['module'];
        moduleFields.field_name = body[key].name;
        moduleFields.label = body[key].label;
        moduleFields.type = body[key].type; // Set type
        await this.c.insert(moduleFields);
      }
    });
  }
}