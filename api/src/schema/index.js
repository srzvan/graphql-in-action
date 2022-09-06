import { GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import Task from './types/task';

const QueryType = new GraphQLObjectType({
  description: 'The root query entry point for the API',
  name: 'Query',
  fields: {
    taskMainList: {
      description: 'A list of the most recent 100 Task objects',
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: (_, __, { pgAPI }) => pgAPI.taskMainList(),
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});
