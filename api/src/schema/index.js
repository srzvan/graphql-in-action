import {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import Task from './types/task';
import { numbersInRangeObject } from '../utils';
import NumbersInRange from './types/numbers-in-range';

const QueryType = new GraphQLObjectType({
  description: 'The root query entry point for the API',
  name: 'Query',
  fields: {
    taskMainList: {
      description: 'A list of the most recent 100 Task objects',
      type: new GraphQLList(new GraphQLNonNull(Task)),
      resolve: (_, __, { pgAPI }) => pgAPI.taskMainList(),
    },
    currentTime: {
      description: 'The current time in ISO UTC',
      type: GraphQLString,
      resolve: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const isoString = new Date().toISOString();

            resolve(isoString.slice(11, 19));
          }, 5000);
        });
      },
    },
    numbersInRange: {
      description:
        'An object representing a range of whole numbers from "begin" to "end", inclusive to the edges',
      type: NumbersInRange,
      args: {
        begin: {
          description: 'The number to begin the range from',
          type: new GraphQLNonNull(GraphQLInt),
        },
        end: {
          description: 'The number to end the range at',
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve: function (_, { begin, end }) {
        return numbersInRangeObject(begin, end);
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});
