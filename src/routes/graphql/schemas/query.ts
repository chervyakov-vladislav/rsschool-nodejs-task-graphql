import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext, MemberType } from '../types/common.js';
import { getMemberTypes, getMemberType } from '../services/member-type.service.js';
import { MemberTypeIdEnum, MemberTypeResponse } from '../types/member-type.js';

export const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberTypeResponse),
      resolve: async (_source, _args, { prisma }: GraphQLContext) =>
        getMemberTypes(prisma),
    },

    memberType: {
      type: MemberTypeResponse,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdEnum),
        },
      },
      resolve: async (_source, { id }: { id: MemberType }, { prisma }: GraphQLContext) =>
        getMemberType(id, prisma),
    },
  },
});
