import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import User from './user';
import SearchResultItem from './search-result-item';
import { extractPrefixedProps } from '../../utils';

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
      resolve: transformTags,
    },
    author: {
      type: new GraphQLNonNull(User),
      resolve: (source) => extractPrefixedProps(source, 'author'),
    },
    approachCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});

function transformTags(source) {
  return source.tags.split(',');
}

export default Task;
