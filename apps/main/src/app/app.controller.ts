import { Controller, Get, Render } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  getData() {
    return this.appService.getData();
  }

  @Get()
  @Render('index')
  index() {
    return {
      app_name: 'p0k3rZ',
    };
  }
}
