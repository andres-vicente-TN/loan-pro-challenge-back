import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';

describe('PrismaService', () => {
  let app: TestingModule;
  let prismaService: PrismaService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [PrismaModule],
    }).compile();
    prismaService = app.get<PrismaService>(PrismaService);
  });

  it('db should be reachable', async () => {
    await expect(prismaService.$queryRaw`SELECT 1`).resolves.not.toThrow();
  });
});
