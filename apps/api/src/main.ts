import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CurrentUserMiddleware } from './middleware/current-user.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new CurrentUserMiddleware().use);
  await app.listen(3001);
}
bootstrap();
