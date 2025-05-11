import { PrismaClient } from '@prisma/client';
import { UserDto } from '../types/common.js';

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

export const createUser = async (dto: UserDto, prisma: PrismaClient) => {
  const newUser = await prisma.user.create({
    data: dto,
  });

  return newUser;
};

export const changeUser = async (id: string, dto: UserDto, prisma: PrismaClient) => {
  const newUser = await prisma.user.update({
    where: { id },
    data: dto,
  });

  return newUser;
};

export const deleteUser = async (id: string, prisma: PrismaClient) => {
  const deletedUser = await prisma.user.delete({ where: { id }, select: { id: true } });

  return deletedUser.id;
};

export const subscribeTo = async (
  userId: string,
  authorId: string,
  prisma: PrismaClient,
) => {
  const subscriber = await prisma.subscribersOnAuthors.create({
    data: {
      subscriberId: userId,
      authorId,
    },
  });

  return subscriber.subscriberId;
};

export const unsubscribeFrom = async (
  userId: string,
  authorId: string,
  prisma: PrismaClient,
) => {
  const result = await prisma.subscribersOnAuthors.delete({
    where: {
      subscriberId_authorId: {
        subscriberId: userId,
        authorId,
      },
    },
  });

  return result.authorId;
};
