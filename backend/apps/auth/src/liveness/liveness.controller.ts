import { Controller, Get } from '@nestjs/common';

@Controller('auth/liveness')
export class LivnessController {
  @Get()
  livness() {
    return { live: 'yes' };
  }
}
