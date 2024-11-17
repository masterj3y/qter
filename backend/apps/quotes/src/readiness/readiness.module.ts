import { Module } from '@nestjs/common';
import { ReadinessService } from './readiness.service';
import { ReadinessController } from './readiness.controller';
import { MDBReadinessChecker, RMQReadinessChecker } from '@app/common';

@Module({
  providers: [ReadinessService, MDBReadinessChecker, RMQReadinessChecker],
  controllers: [ReadinessController],
})
export class ReadinessModule {}
