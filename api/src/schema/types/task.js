import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import User from './user';
import Approach from './approach';
import SearchResultItem from './search-result-item';
import { commaSeparatedStringToArray } from '../../utils';

const Task = new GraphQLObjectType({
  name: 'Task',
  description: 'A task is a user created resource',
  interfaces: [SearchResultItem],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source.createdAt.toISOString(),
    },
    tags: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      resolve: commaSeparatedStringToArray,
    },
    author: {
      type: new GraphQLNonNull(User),
      resolve: (source, _, { loaders }) => loaders.users.load(source.userId),
    },
    approachCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    approachList: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Approach))),
      resolve: (source, _, { loaders }) => loaders.approachLists.load(source.id),
    },
  },
});

export default Task;
