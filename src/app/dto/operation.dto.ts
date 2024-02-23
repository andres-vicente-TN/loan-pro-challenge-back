import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class OperationDto {
  @ApiProperty({
    enum: ['ADD', 'SUB', 'MUL', 'DIV', 'SQR', 'STR'],
  })
  @IsNotEmpty({ message: 'operator can not be empty' })
  @IsIn(['ADD', 'SUB', 'MUL', 'DIV', 'SQR', 'STR'])
  operator: string;

  @ApiProperty()
  @ValidateIf((o) => ['ADD', 'SUB', 'MUL', 'DIV'].includes(o.operator))
  @IsNumber()
  value1: number;

  @ApiProperty()
  @IsNumber()
  @ValidateIf((o) => ['ADD', 'SUB', 'MUL', 'DIV', 'SQR'].includes(o.operator))
  value2: number;
}
