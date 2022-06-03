import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const dir = (path: string) => join(__dirname, './', path);

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(dir('assets'));
  app.setBaseViewsDir(dir('views'));
  app.setViewEngine('ejs');

  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0');

  Logger.log(`🚀 p0k3rZ: http://localhost:${port}/`);
}

bootstrap();
