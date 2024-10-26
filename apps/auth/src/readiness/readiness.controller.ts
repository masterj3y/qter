import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ReadinessService } from './readiness.service';

@Controller('auth/readiness')
export class ReadinessController {
  constructor(private readonly readinessService: ReadinessService) {}

  @Get()
  async checkReadiness() {
    const isReady = (await this.readinessService.checkReadiness()) === true;
    if (!isReady) {
      throw new InternalServerErrorException();
    }
    return { ready: isReady ? 'yes' : 'no' };
  }
}
