import { PrismaClient } from '@prisma/client';

export const getUsers = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();

  return users;
};

export const getUser = async (id: string, prisma: PrismaClient) => {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
};
