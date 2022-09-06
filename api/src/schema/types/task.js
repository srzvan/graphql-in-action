import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import SearchResultItem from './search-result-item';

const Task = new GraphQLObjectType({
  name: 'Task',
  description: 'A task is a user created resource',
  interfaces: [SearchResultItem],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    tags: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      resolve: transformTags,
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
