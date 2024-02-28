const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Operation costs
  await prisma.operations.upsert({
    where: { id: 1 },
    update: {},
    create: {
      type: 'ADD',
      cost: 0.05,
    },
  });

  await prisma.operations.upsert({
    where: { id: 2 },
    update: {},
    create: {
      type: 'SUB',
      cost: 0.05,
    },
  });

  await prisma.operations.upsert({
    where: { id: 3 },
    update: {},
    create: {
      type: 'MUL',
      cost: 0.1,
    },
  });

  await prisma.operations.upsert({
    where: { id: 4 },
    update: {},
    create: {
      type: 'DIV',
      cost: 0.1,
    },
  });

  await prisma.operations.upsert({
    where: { id: 5 },
    update: {},
    create: {
      type: 'SQR',
      cost: 0.15,
    },
  });

  await prisma.operations.upsert({
    where: { id: 6 },
    update: {},
    create: {
      type: 'STR',
      cost: 0.15,
    },
  });

  // User
  await prisma.users.upsert({
    where: { id: 1 },
    update: {},
    create: {
      username: 'user',
      password: await hash('123456', 12),
    },
  });

  // Initial record
  await prisma.records.upsert({
    where: { id: 1 },
    update: {},
    create: {
      user_id: 1,
      operation_id: 1,
      description: 'Initial balance',
      user_balance: 10,
      operation_response: '',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
