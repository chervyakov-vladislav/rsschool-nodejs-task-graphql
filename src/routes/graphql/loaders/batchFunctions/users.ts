import { PrismaClient, User } from '@prisma/client';

export const users = (prisma: PrismaClient) => async (userIds: readonly string[]) => {
  const users = await prisma.user.findMany({
    where: { id: { in: userIds as string[] } },
    include: {
      userSubscribedTo: true,
      subscribedToUser: true,
    },
  });

  const userMap = users.reduce((obj: Record<string, User>, user) => {
    obj[user.id] = user;

    return obj;
  }, {});

  const batchedUsers = userIds.map((id) => userMap[id]);

  return batchedUsers;
};
