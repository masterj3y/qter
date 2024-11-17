import { MDBReadinessChecker, RMQReadinessChecker } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadinessService {
  constructor(
    private readonly mdbReadinessChecker: MDBReadinessChecker,
    private readonly rmqReadinessChecker: RMQReadinessChecker,
  ) {}

  async checkReadiness() {
    const isMDBReady = await this.mdbReadinessChecker.check();
    const isRMQReady = await this.rmqReadinessChecker.check();
    return isMDBReady && isRMQReady;
  }
}
