import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import Task from './types/task';
import { TASKS_TYPES } from '../db/pg-api/constants';
import SearchResultItem from './types/search-result-item';

export const QueryType = new GraphQLObjectType({
  description: 'The root query entry point of the API',
  name: 'Query',
  fields: {
    taskMainList: {
      description: 'A list of the most recent 100 Task objects',
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: (_, __, { loaders }) =>
        loaders.getTasksByType.load(TASKS_TYPES.latest),
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
        return loaders.getTasksById.load(args.id);
      },
    },
    search: {
      description: 'Search by term for Approach or Task entitites',
      type: new GraphQLList(new GraphQLNonNull(SearchResultItem)),
      args: {
        term: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, args, { loaders }) => loaders.searchResults.load(args.term),
    },
  },
});
