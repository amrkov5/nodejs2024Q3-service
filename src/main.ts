import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CustomLogger } from './logger/logger.service';
import { CustomExceptionsFilter } from './exceptionFilter/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.useLogger(app.get(CustomLogger));
  app.useGlobalFilters(new CustomExceptionsFilter(app.get(CustomLogger)));

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '4000');

  const config = new DocumentBuilder()
    .setTitle('Home music library API Documentation')
    .setDescription('API documentation for the Home music library application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // const yamlStr = yaml.dump(document);
  // fs.writeFile('./doc/api.yaml', yamlStr, (err) => {
  //   if (err) {
  //     console.error('Error writing file:', err);
  //   }
  // });

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Swagger API is accessible on http://localhost:${port}/api`);
}
bootstrap();
