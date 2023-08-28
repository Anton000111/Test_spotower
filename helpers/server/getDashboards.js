import { PrismaClient } from '@prisma/client'

export const getDashboards = async () => {
  const prisma = new PrismaClient();
  const dashboards = prisma.dashboard.findMany();

  return dashboards;
};
