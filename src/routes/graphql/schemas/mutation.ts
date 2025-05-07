import { GraphQLObjectType, GraphQLString } from 'graphql';

export const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    testString: {
      type: GraphQLString,
      resolve: async () => {
        return 'Hello';
      },
    },
  },
});
