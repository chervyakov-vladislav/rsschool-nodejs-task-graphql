import { MemberType, PrismaClient } from '@prisma/client';
import { MemberTypeId } from '../../../member-types/schemas.js';

export const member =
  (prisma: PrismaClient) => async (memberTypeIds: readonly string[]) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: memberTypeIds as MemberTypeId[] } },
    });

    const memberTypeMap = memberTypes.reduce(
      (obj: Record<string, MemberType>, memberType) => {
        obj[memberType.id] = memberType;

        return obj;
      },
      {},
    );

    return memberTypeIds.map((id) => memberTypeMap[id]);
  };
