import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationDto } from './dto/operation.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('1+1 should return "2"', () => {
      const body: OperationDto = {
        operator: 'ADD',
        value1: 1,
        value2: 1,
      };
      expect(appController.createOperation(body)).toBe('2');
    });
  });

  describe('root', () => {
    it('sqrt(16) should return "4"', () => {
      const body: OperationDto = {
        operator: 'SQR',
        value1: null,
        value2: 16,
      };
      expect(appController.createOperation(body)).toBe('4');
    });
  });
});
