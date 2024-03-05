import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { OperationDto } from './dto/operation.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { IsAuthenticated } from '../auth/decorators/is-authenticated.decorator';
import { OperationModel, RecordModel } from './model/types';
import { GetAuthUser } from 'src/auth/decorators/get-auth-user.decorator';
import { RecordResponseDto } from './dto/responses.dto';
import { plainToClass } from 'class-transformer';
import { filter } from 'rxjs';
import { BalanceDto } from './dto/balance.dto';

@Controller()
@IsAuthenticated()
@ApiTags('operations')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/operations')
  async createOperation(
    @Body() operation: OperationDto,
    @GetAuthUser() loggedUser: string,
  ): Promise<RecordModel> {
    return await this.appService.calculate(
      operation.operator,
      operation.value1,
      operation.value2,
      loggedUser,
    );
  }

  @Get('/costs')
  getCosts(): Promise<OperationModel[]> {
    return this.appService.getCosts();
  }

  @Get('/balance')
  getBalance(@GetAuthUser() loggedUser: string): Promise<BalanceDto> {
    return this.appService.getLastRecord(loggedUser).then((r) =>
      plainToClass(BalanceDto, {
        username: loggedUser,
        user_balance: r.user_balance.toNumber().toFixed(2),
      }),
    );
  }

  @Get('/records')
  @ApiQuery({ name: 'skip', example: 0 })
  @ApiQuery({ name: 'take', example: 10 })
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'inverseOrder', example: true, required: false })
  getRecords(
    @GetAuthUser() loggedUser: string,
    @Query('skip', new ParseIntPipe({ optional: true }))
    skip: number,
    @Query('take', new ParseIntPipe({ optional: true }))
    take: number,
    @Query('filter')
    filter: string = '',
    @Query('inverseOrder', new ParseBoolPipe({ optional: true }))
    inverseOrder: boolean = true,
  ): Promise<RecordResponseDto[]> {
    return this.appService
      .getRecords(loggedUser, skip, take, filter, inverseOrder)
      .then((records) =>
        records.map((r) =>
          plainToClass(RecordResponseDto, {
            id: r.id,
            description: r.description,
            operation_response: r.operation_response,
            user_balance: r.user_balance.toNumber().toFixed(2),
          }),
        ),
      );
  }

  @Delete('/records/:id')
  deleteRecord(
    @Param('id', ParseIntPipe) id: number,
    @GetAuthUser() loggedUser: string,
  ): Promise<RecordModel> {
    return this.appService.deleteRecord(id, loggedUser);
  }
}
