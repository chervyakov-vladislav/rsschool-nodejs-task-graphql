import { PrismaClient } from '@prisma/client';

export const getUsers = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();

  return users;
};

export const getUser = async (id: string, prisma: PrismaClient) => {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
};

export const getUserSubscribedTo = async (id: string, prisma: PrismaClient) => {
  const subscriptions = await prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: id,
        },
      },
    },
  });

  return subscriptions;
};

export const getSubscribedToUser = async (id: string, prisma: PrismaClient) => {
  const subscriptions = await prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: id,
        },
      },
    },
  });

  return subscriptions;
};
