import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swagger } from './configs/swagger-config/swagger';
import { port } from './utils/constants/port.constant';

async function bootstrap() {
  console.log("restarted app.......")
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  swagger(app);

  //create constants/common.ts --> port= 3000
  await app.listen(port);
}
bootstrap();
