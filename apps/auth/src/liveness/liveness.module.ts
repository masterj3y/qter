import { Module } from '@nestjs/common';
import { LivnessController } from './liveness.controller';

@Module({
  controllers: [LivnessController]
})
export class LivnessModule { }
