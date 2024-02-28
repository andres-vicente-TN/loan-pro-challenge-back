import { Prisma } from '@prisma/client';

interface OperationModel {
  id: number;
  type: string;
  cost: Prisma.Decimal;
  created_at: Date;
}

interface UserModel {
  id: number;
  username: string;
  password: string;
  status: string;
  created_at: Date;
}

interface RecordModel {
  id: number;
  description: string;
  operation_response: string;
  user_balance: Prisma.Decimal;
}

export { OperationModel, UserModel, RecordModel };
