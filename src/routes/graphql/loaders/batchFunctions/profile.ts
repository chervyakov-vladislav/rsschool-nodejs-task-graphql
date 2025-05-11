import { PrismaClient, Profile } from '@prisma/client';

export const profiles = (prisma: PrismaClient) => async (userIds: readonly string[]) => {
  const profiles = await prisma.profile.findMany({
    where: { userId: { in: userIds as string[] } },
  });

  const profileMap = profiles.reduce((obj: Record<string, Profile>, profile) => {
    obj[profile.userId] = profile;

    return obj;
  }, {});

  const batchedProfiles = userIds.map((id) => profileMap[id]);

  return batchedProfiles;
};
