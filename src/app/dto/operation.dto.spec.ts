import { validateSync } from 'class-validator';
import { OperationDto } from './operation.dto';
import { plainToClass } from 'class-transformer';

describe('OperationDTO', () => {
  it('empty operator', () => {
    const body: OperationDto = plainToClass(OperationDto, {
      operator: '',
      value1: 1,
      value2: 1.5,
    });
    const errors = validateSync(body);
    expect(JSON.stringify(errors)).toContain(`operator can not be empty`);
  });

  it('invalid operator', () => {
    const body: OperationDto = plainToClass(OperationDto, {
      operator: 'ASD',
      value1: 1,
      value2: 1.5,
    });
    const errors = validateSync(body);
    expect(JSON.stringify(errors)).toContain(
      `operator must be one of the following values: ADD, SUB, MUL, DIV, SQR, STR`,
    );
  });

  it('value1 must be a number', () => {
    const body: OperationDto = plainToClass(OperationDto, {
      operator: 'ADD',
      value1: '1',
      value2: 2.33,
    });
    const errors = validateSync(body);
    expect(JSON.stringify(errors)).toContain(`value1 must be a number`);
  });

  it('no errors', () => {
    const body: OperationDto = plainToClass(OperationDto, {
      operator: 'STR',
    });
    const errors = validateSync(body);
    expect(errors.length).toBe(0);
  });

  it('value2 must be a number', () => {
    const body: OperationDto = plainToClass(OperationDto, {
      operator: 'SQR',
    });
    const errors = validateSync(body);
    expect(JSON.stringify(errors)).toContain(`value2 must be a number`);
  });
});
