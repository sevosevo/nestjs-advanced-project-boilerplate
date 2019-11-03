import 'array-flat-polyfill';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ExceptionHandler } from './errorHandler/exception.handler';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const PORT = 3001;
    await app.listen(PORT);
};

bootstrap()
.then(() => console.log('Server started'))
.catch(err => console.error(err));