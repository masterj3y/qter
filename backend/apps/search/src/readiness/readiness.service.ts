import { ESReadinessChecker, RMQReadinessChecker } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadinessService {
  constructor(
    private readonly esReadinessChecker: ESReadinessChecker,
    private readonly rmqReadinessChecker: RMQReadinessChecker,
  ) {}

  async checkReadiness() {
    const isESReady = await this.esReadinessChecker.check();
    const isRMQReady = await this.rmqReadinessChecker.check();
    return isESReady && isRMQReady;
  }
}
