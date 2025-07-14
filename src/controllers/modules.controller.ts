import {
  Controller,
  Post,
  Request,
  Inject,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Put
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Modules } from '../entities/modules.entity';
import { v6 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('modules')
export class ModulesController {
  constructor(
    @Inject('MODULE_REPOSITORY')
    private c: Repository<Modules>,
  ) {}
  @Get()
  async getModules(): Promise<any> {
    return await this.c.createQueryBuilder('modules').getMany();
  }

  @Post()
  async saveRecord(@Body() body, @Param() params): Promise<any> {
    let idNewRecord = v6();
    const modules = new Modules();
    modules.name = body['name'];
    modules.label = body['label'];
    modules.icon = '/Users';
    await this.c.insert(modules);
  }

    @Delete(':id')
    deleteModule(@Param() params) {
      this.c.delete(params['id']);
    }

    @Put(':id')
    updateUser(@Body() body, @Param() params) {
      const modules =  this.c.findBy({id: params['id']}).then((module : Modules[]) => {
          Object.keys(body).forEach(key => {
            module[0][key] = body[key];
        })
        this.c.save(module);
      })
    }
}
