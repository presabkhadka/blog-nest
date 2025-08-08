import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';

@Module({
  imports: [ContentsModule],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
