import { GraphQLSchema } from 'graphql';

import { QueryType } from './queries';

export const schema = new GraphQLSchema({
  query: QueryType,
});
