import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: 'http://localhost:3000'
  })
  const port = process.env.PROJECT_PORT;
  await app.listen(port, ()=> console.log(`running on port: ${port}`));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(port, () => console.log(`running on port ${port}`))
}


bootstrap();
