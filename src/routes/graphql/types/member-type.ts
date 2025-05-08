import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { MemberType } from './common.js';

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberType.BASIC]: { value: MemberType.BASIC },
    [MemberType.BUSINESS]: { value: MemberType.BUSINESS },
  },
});

export const MemberTypeResponse = new GraphQLObjectType({
  name: 'MemberTypeResponse',
  fields: {
    id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});
