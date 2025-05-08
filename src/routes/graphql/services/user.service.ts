import { PrismaClient } from '@prisma/client';

export const getUsers = async (prisma: PrismaClient) => {
  const users = await prisma.user.findMany();

  return users;
};

export const getUser = async (id: string, prisma: PrismaClient) => {
  const user = await prisma.user.findUnique({ where: { id } });

  return user;
};

export const getUserSubscriptions = async (id: string, prisma: PrismaClient) => {
  const subscriptions = await prisma.subscribersOnAuthors.findMany({
    where: { subscriberId: id },
    include: { author: true },
  });

  return subscriptions.map((subscription) => subscription.author);
};

export const getUserSubscrbers = async (id: string, prisma: PrismaClient) => {
  const subscriptions = await prisma.subscribersOnAuthors.findMany({
    where: { authorId: id },
    include: { subscriber: true },
  });

  return subscriptions.map((subscription) => subscription.subscriber);
};
