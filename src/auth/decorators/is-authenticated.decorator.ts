import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBasicAuth } from '@nestjs/swagger';
import { BasicStrategyGuard } from '../guards/basic-strategy.guard';

export function IsAuthenticated() {
  return applyDecorators(ApiBasicAuth(), UseGuards(BasicStrategyGuard));
}
