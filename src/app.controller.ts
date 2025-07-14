import { Controller, Get, UseGuards, UnauthorizedException, Inject  } from '@nestjs/common';
import { AppService } from './app.service';
import {createConnection} from 'mysql';

import {Observable, Subject} from 'rxjs'
import {Photo} from './entities/photo.entity'
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {

  /*constructor(
    private readonly appService: AppService)
  {}*/



  /*@Get()
  async getHello(): Promise<any> {

 
    let connection = createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'moyne_roberts'
    });

    return new Promise((resolve, reject)=>{
      connection.query('SELECT * FROM config ',  (error, elements)=>{
          if(error){
              return reject(error);
          }
          return resolve(elements);
      });
  });

  }*/


}
