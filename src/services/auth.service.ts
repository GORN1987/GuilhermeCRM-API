import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { OAuth2Client } from 'google-auth-library';

type UserData = {
  user_name?: string;
  password?: string;
  token?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USERS_REPOSITORY')
    private c: Repository<Users>,
  ) {}

  async validateUser(body: UserData): Promise<any> {
    let users: Users[];
    if (body.token) {
      const client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
      );
      const ticket = await client.verifyIdToken({
        idToken: body.token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      users = await this.c.findBy({
        email: ticket.getAttributes().payload.email,
      });
      if (users.length == 0) {
        throw new UnauthorizedException();
      }
    } else {
      users = await this.c.findBy({ email: body.user_name });
      if ((users.length == 0) || (users[0].password != body.password)) {
        throw new UnauthorizedException();
      }
    }

    // Here you would typically query your database to validate the user
    // For this example, we'll use a mock user
    //const user = { id: 1, username: 'user', password: 'password' };

    //if (user && user[0].password === body.password) {
    //const { password, ...result } = users[0];
    return {...users[0]};
    //}
    //throw new UnauthorizedException();
    //return null;
  }

  async login(user: any) : Promise<any> {
    const payload = {
      username: user.username,
      token: user.token,
      password: user.password,
    };
    let token = user.token;
    return {
      access_token: this.jwtService.sign(
        await this.validateUser({
          user_name: payload.username,
          password: payload.password,
          token,
        }),
      ),
    };
  }
}
