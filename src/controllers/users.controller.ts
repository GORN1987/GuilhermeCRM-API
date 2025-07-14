import { Controller, Get,Query, UseGuards, UnauthorizedException, Inject, Post, Body, Param, Put } from '@nestjs/common'
import {Users} from '../entities/users.entity'
import { AuthGuard } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { OAuth2Client } from 'google-auth-library';

@Controller("users")
export class UserController {

  constructor(
    @Inject('USERS_REPOSITORY')
    private c: Repository<Users>
  )
  {}

  //@UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers(): Promise<any> {
    return await this.c.createQueryBuilder('users').getMany();
  }

  
  @Get(':id')
  async getUser(@Param() params, @Query() queries): Promise<any> {
    const client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
     );
     if (queries["token"]) {
      const ticket = await client.verifyIdToken({
        idToken: queries["token"],
        audience: process.env.GOOGLE_CLIENT_ID,
      });
     }

    return await this.c.findBy({id: params['id']});;
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async saveUser(@Body() body): Promise<any> {
    const user = new Users();

    Object.keys(body).forEach(key => {
        user[key] = body[key];
    })

    return await this.c.insert(user);
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateUser(@Body() body, @Param() params) {
    const user =  this.c.findBy({id: params['id']}).then((user : Users[]) => {
        Object.keys(body).forEach(key => {
        user[0][key] = body[key];
        this.c.save(user);
      })
    })
  }

}
