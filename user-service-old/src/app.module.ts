import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import UserModule from './user/user.module';
import configuration from './common/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
  ],
})
export default class AppModule {}
