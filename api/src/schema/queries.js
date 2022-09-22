import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import Task from './types/task';
import { TASKS_TYPES } from '../db/pg-api';

export const QueryType = new GraphQLObjectType({
  description: 'The root query entry point for the API',
  name: 'Query',
  fields: {
    taskMainList: {
      description: 'A list of the most recent 100 Task objects',
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: (_, __, { loaders }) => loaders.tasksByType.load(TASKS_TYPES.latest),
    },
    taskInfo: {
      description: 'Get information about a Task entity by ID',
      type: Task,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, args, { loaders }) => {
        return loaders.tasks.load(args.id);
      },
    },
  },
});
