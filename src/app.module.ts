import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [AuthModule, UserModule, ItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
