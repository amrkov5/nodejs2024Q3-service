import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import process from 'process';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '4000');

  const config = new DocumentBuilder()
    .setTitle('Home music library API Documentation')
    .setDescription('API documentation for the Home music library application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const yamlStr = yaml.dump(document);
  fs.writeFile('./doc/api.yaml', yamlStr, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    }
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Swagger API is accessible on https://localhost:${port}/api`);
}
bootstrap();
