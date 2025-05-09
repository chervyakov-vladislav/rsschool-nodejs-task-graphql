import { PrismaClient } from '@prisma/client';
import { ProfileDto } from '../types/common.js';

export const getProfiles = async (prisma: PrismaClient) => {
  const profiles = await prisma.profile.findMany();

  return profiles;
};

export const getProfile = async (id: string, prisma: PrismaClient) => {
  const profile = await prisma.profile.findUnique({ where: { id } });

  return profile;
};

export const getProfileByUserId = async (id: string, prisma: PrismaClient) => {
  const profile = await prisma.profile.findUnique({ where: { userId: id } });

  return profile;
};

export const createProfile = async (dto: ProfileDto, prisma: PrismaClient) => {
  const newProfile = await prisma.profile.create({
    data: dto,
  });

  return newProfile;
};

export const changeProfile = async (
  id: string,
  dto: ProfileDto,
  prisma: PrismaClient,
) => {
  const newProfile = await prisma.profile.update({
    where: { id },
    data: dto,
  });

  return newProfile;
};

export const deleteProfile = async (id: string, prisma: PrismaClient) => {
  const profile = await prisma.profile.delete({ where: { id } });

  return profile.id;
};
