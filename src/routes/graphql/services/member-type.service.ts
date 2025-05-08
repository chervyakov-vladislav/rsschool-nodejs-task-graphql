import { PrismaClient } from '@prisma/client';
import { MemberType } from '../types/common.js';

export const getMemberTypes = async (prisma: PrismaClient) => {
  const memberTypes = await prisma.memberType.findMany();

  return memberTypes;
};

export const getMemberType = async (id: MemberType, prisma: PrismaClient) => {
  const memberType = await prisma.memberType.findFirst({ where: { id } });

  return memberType;
};
