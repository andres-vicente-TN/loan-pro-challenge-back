import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { OperationModel, RecordModel } from './model/types';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  /**
   * If logged user has sufficient balance, calculate the operation and return a new record with the result
   *
   * @param operation: ADD (v1+v2) | SUB (v1-v2) | MUL (v1*v2) | DIV (v1/v2) | SQR (sqrt of v2) | STR (random string)
   * @param value1
   * @param value2
   * @param loggedUser
   * @returns new record
   */
  async calculate(
    operation: string,
    value1: number,
    value2: number,
    loggedUser: string,
  ): Promise<RecordModel> {
    return this.prisma.operations
      .findUnique({
        where: { type: operation },
      })
      .then(async (op) => {
        const userBalance = await this.findUserBalance(loggedUser);
        const newBalance: number = userBalance.balance - op.cost.toNumber();
        if (newBalance < 0) {
          throw new BadRequestException('The balance is insufficient');
        }
        const calcResult = await this.calculateOperation(
          operation,
          value1,
          value2,
        );

        const newRecord: RecordModel = await this.prisma.records.create({
          data: {
            operation_id: op.id,
            user_id: userBalance.userid,
            description: this.getOperationDescription(
              operation,
              value1,
              value2,
            ),
            user_balance: newBalance,
            operation_response: calcResult,
          },
        });

        return newRecord;
      });
  }

  /**
   * @returns All operations with costs
   */
  getCosts(): Promise<OperationModel[]> {
    return this.prisma.operations.findMany();
  }

  /**
   * @param loggedUser
   * @returns All user's records
   */
  getRecords(
    loggedUser: string,
    skip: number,
    take: number,
    // filter: string, TODO: add
    // orderBy: string, TODO: add
  ): Promise<RecordModel[]> {
    return this.prisma.records.findMany({
      where: { user: { username: loggedUser }, deleted: false },
      skip: skip,
      take: take,
    });
  }

  /**
   * Delete a user record
   * @param id
   * @param loggedUser
   * @returns deleted record
   */
  deleteRecord(id: number, loggedUser: string): Promise<RecordModel> {
    return this.prisma.records.update({
      where: { id: id, user: { username: loggedUser } },
      data: { deleted: true },
    });
  }

  private getOperationDescription(operation, v1, v2): string {
    switch (operation) {
      case 'ADD':
        return v1 + ' + ' + v2;
      case 'SUB':
        return v1 + ' - ' + v2;
      case 'MUL':
        return v1 + ' * ' + v2;
      case 'DIV':
        return v1 + ' / ' + v2;
      case 'SQR':
        return 'sqrt(' + v2 + ')';
      case 'STR':
        return 'random string';
    }
  }

  private async findUserBalance(loggedUser: string): Promise<{
    userid: number;
    balance: number;
  }> {
    const sql = `SELECT u.id as userid, r.user_balance as balance
    FROM records as r JOIN users as u ON u.id = r.user_id
    WHERE u.username = '${loggedUser}' ORDER BY r.created_at DESC limit 1`;
    const result = await this.prisma.$queryRaw(Prisma.raw(sql));
    return result[0];
  }

  private calculateOperation(
    operation: string,
    value1: number,
    value2: number,
  ): Promise<string> {
    switch (operation) {
      case 'ADD': {
        return this.numberToStringPromise(value1 + value2);
      }
      case 'SUB': {
        return this.numberToStringPromise(value1 - value2);
      }
      case 'MUL': {
        return this.numberToStringPromise(value1 * value2);
      }
      case 'DIV': {
        return this.numberToStringPromise(value1 / value2);
      }
      case 'SQR': {
        return this.numberToStringPromise(Math.sqrt(value2));
      }
      case 'STR': {
        return axios
          .get(this.configService.get('RANDOM_STRING_URL'))
          .then((response) => response.data.toString().slice(0, -1)); // the last char is allways \n
      }
    }
  }

  private numberToStringPromise(n: number): Promise<string> {
    return Promise.resolve(n.toString());
  }

  private getRandomString(): string {
    return 'random';
  }
}
