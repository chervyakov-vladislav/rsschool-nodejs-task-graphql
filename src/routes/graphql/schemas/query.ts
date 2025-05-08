import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext, MemberType } from '../types/common.js';
import { getMemberTypes, getMemberType } from '../services/member-type.service.js';
import { MemberTypeIdEnum, MemberTypeResponse } from '../types/member-type.js';
import { getPost, getPosts } from '../services/post.service.js';
import { PostResponse } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';
import { ProfileResponse } from '../types/profile.js';
import { getProfile, getProfiles } from '../services/profile.service.js';
import { UserResponse } from '../types/user.js';
import { getUser, getUsers } from '../services/user.service.js';

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
      args: { id: { type: new GraphQLNonNull(MemberTypeIdEnum) } },
      resolve: async (_source, { id }: { id: MemberType }, { prisma }: GraphQLContext) =>
        getMemberType(id, prisma),
    },

    posts: {
      type: new GraphQLList(PostResponse),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => getPosts(prisma),
    },

    post: {
      type: PostResponse,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: { id: string }, { prisma }: GraphQLContext) =>
        getPost(id, prisma),
    },

    profiles: {
      type: new GraphQLList(ProfileResponse),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => getProfiles(prisma),
    },

    profile: {
      type: ProfileResponse,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: { id: string }, { prisma }: GraphQLContext) =>
        getProfile(id, prisma),
    },

    users: {
      type: new GraphQLList(UserResponse),
      resolve: async (_source, _args, { prisma }: GraphQLContext) => getUsers(prisma),
    },

    user: {
      type: UserResponse,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source, { id }: { id: string }, { prisma }: GraphQLContext) =>
        getUser(id, prisma),
    },
  },
});
