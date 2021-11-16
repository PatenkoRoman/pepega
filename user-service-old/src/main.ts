import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import ValidationPipe from './validation.pipe';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import AppModule from './app.module';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    appOptions,
  );
  app.useGlobalPipes(new ValidationPipe());
  app.use(loggerMiddleware);

  const options = new DocumentBuilder()
    .setTitle('NestJS account-service')
    .setDescription('The account-service API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}

bootstrap();
