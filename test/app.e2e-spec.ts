import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: false },
        whitelist: true,
      }),
    );
    await app.init();
  });

  it('/operations (POST)', () => {
    return request(app.getHttpServer())
      .post('/operations')
      .send({ operator: 'SQR', value2: 4 })
      .expect(201)
      .expect('2');
  });

  it('/operations (POST)', () => {
    return request(app.getHttpServer())
      .post('/operations')
      .send({ operator: 'MUL', value1: 4, value2: 4 })
      .expect(201)
      .expect('16');
  });
});
