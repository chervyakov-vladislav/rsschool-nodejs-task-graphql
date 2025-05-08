import { PrismaClient } from '@prisma/client';

export const getProfiles = async (prisma: PrismaClient) => {
  const profiles = await prisma.profile.findMany();

  return profiles;
};

export const getProfile = async (id: string, prisma: PrismaClient) => {
  const profile = await prisma.profile.findUnique({ where: { id } });

  return profile;
};
