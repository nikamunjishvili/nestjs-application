import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swagger } from './configs/swagger-config/swagger';
import { port } from './utils/constants/port.constant';

async function bootstrap() {
  console.log("restarted app.......")
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:5500', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  swagger(app);

  //create constants/common.ts --> port= 3000
  await app.listen(port);
}
bootstrap();
