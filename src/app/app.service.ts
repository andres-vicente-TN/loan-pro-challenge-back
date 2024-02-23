import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class AppService {
  calculate(operation: string, value1: number, value2: number): string {
    let result;
    switch (operation) {
      case 'ADD': {
        result = value1 + value2;
        break;
      }
      case 'SUB': {
        result = value1 - value2;
        break;
      }
      case 'MUL': {
        result = value1 * value2;
        break;
      }
      case 'DIV': {
        result = value1 / value2;
        break;
      }
      case 'SQR': {
        result = Math.sqrt(value2);
        break;
      }
      case 'STR': {
        result = this.getRandomString();
        break;
      }
    }
    return result.toString();
  }

  getCosts(): string {
    return '0.1';
  }

  getRecords(): string {
    return '0.1';
  }

  deleteRecord(id: UUID): string {
    return id;
  }

  getRandomString(): string {
    return 'random';
  }
}
