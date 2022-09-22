import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInterfaceType,
} from 'graphql';

import Task from './task';
import Approach from './approach';

const SearchResultItem = new GraphQLInterfaceType({
  name: 'SearchResultItem',
  description: 'Common properties for search result items',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolveType: (result) => {
    if (result.type === 'task') {
      return Task;
    }

    if (result.type === 'approach') {
      return Approach;
    }
  },
});

export default SearchResultItem;
