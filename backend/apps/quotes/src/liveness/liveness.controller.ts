import { Controller, Get } from '@nestjs/common';

@Controller('quotes/liveness/check')
export class LivenessController {
  @Get()
  livness() {
    return { live: 'yes' };
  }
}
