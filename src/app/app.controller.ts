import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OperationDto } from './dto/operation.dto';
import { UUID } from 'crypto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/operations')
  createOperation(@Body() operation: OperationDto): string {
    operation.operator;
    return this.appService.calculate(
      operation.operator,
      operation.value1,
      operation.value2,
    );
  }

  @Get('/costs')
  getCosts(): string {
    return this.appService.getCosts();
  }

  @Get('/records')
  getRecords(): string {
    return this.appService.getRecords();
  }

  @Delete('/records')
  deleteRecord(id: UUID): string {
    return this.appService.deleteRecord(id);
  }
}
