import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
// import { validate } from 'graphql/validation';
import { schema } from './schemas.js';
import depthLimit from 'graphql-depth-limit';
import { createLoaders } from './loaders/createLoaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const documentAST = parse(req.body.query);
      const errors = validate(schema, documentAST, [depthLimit(5)]);
      if (errors.length) return { errors };

      const loaders = createLoaders(prisma);

      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prisma, ...loaders },
      });
    },
  });
};

export default plugin;
