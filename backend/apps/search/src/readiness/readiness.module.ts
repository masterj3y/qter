import { Module } from '@nestjs/common';
import { ReadinessService } from './readiness.service';
import { ReadinessController } from './readiness.controller';
import { ESReadinessChecker, RMQReadinessChecker } from '@app/common';

@Module({
  controllers: [ReadinessController],
  providers: [ReadinessService, ESReadinessChecker, RMQReadinessChecker],
})
export class ReadinessModule {}
