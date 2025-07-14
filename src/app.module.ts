import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './providers/database.providers';
import { modulesFieldsProviders } from './providers/modules_fields.providers';
import { modulesFieldsValuesProviders } from './providers/modules_fields_values.providers';
import { modulesFieldsValuesDefinitionProviders } from './providers/modules_fields_values_definition.providers';
import { usersProviders } from './providers/users.providers';
import { modulesProviders } from './providers/modules.providers';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/users.controller';
import { ModulesFieldsValuesController } from './controllers/modules_fields_values.controller';
import { ConfigModule } from '@nestjs/config';
import { ModulesController } from './controllers/modules.controller';
import { ModulesFieldsController } from './controllers/modules_fields.controller';
import { ModulesFieldsValuesDefinitionController } from './controllers/modules_fields_values_definition.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // In production, use environment variables
      signOptions: { expiresIn: '60m' },
    }),
    ConfigModule.forRoot()
  ],
  providers: [AuthService, JwtStrategy, AppService, 
    ...databaseProviders, ...modulesFieldsProviders, ...usersProviders, ...modulesProviders, ...modulesFieldsValuesProviders, ...modulesFieldsValuesDefinitionProviders ],
  controllers: [AuthController, AppController, UserController, ModulesController, ModulesFieldsController, ModulesFieldsValuesController, ModulesFieldsValuesDefinitionController],
  exports: [AuthService, AppService, ...databaseProviders],
})
export class AppModule {}


