import {
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
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
    tags: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
    approachCount: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export default Task;
