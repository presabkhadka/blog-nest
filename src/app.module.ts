import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ContentsModule } from './contents/contents.module';

@Module({
  imports: [UsersModule, ContentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
