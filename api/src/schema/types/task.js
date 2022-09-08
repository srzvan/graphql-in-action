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
      resolve: (source, _, { pgAPI }) => pgAPI.userInfo(source.userId),
    },
    approachCount: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    approachList: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Approach))),
      resolve: (source, _, { pgAPI }) => pgAPI.approachList(source.id),
    },
  },
});

function transformTags(source) {
  return source.tags.split(',');
}

export default Task;
