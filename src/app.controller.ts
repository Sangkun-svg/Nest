import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('App Controller')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/Test Api for Swagger')
  @ApiOperation({
    summary: 'Summary',
    description: 'Description.',
  })
  getHello(): string {
    return 'pong!';
  }
}
