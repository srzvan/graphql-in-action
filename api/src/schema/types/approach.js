import {
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import User from './user';
import SearchResultItem from './search-result-item';

const Approach = new GraphQLObjectType({
  name: 'Approach',
  description: 'An Approach is a possible solution for a Task',
  interfaces: [SearchResultItem],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (source) => source.createdAt.toISOString(),
    },
    voteCount: { type: new GraphQLNonNull(GraphQLInt) },
    author: {
      type: new GraphQLNonNull(User),
      resolve: (source, _, { pgAPI }) => pgAPI.userInfo(source.userId),
    },
    // task: new GraphQLNonNull(Task),
    // detailList: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ApproachDetail)))
  },
});

export default Approach;
