import { GraphQLInterfaceType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';

const SearchResultItem = new GraphQLInterfaceType({
  name: 'SearchResultItem',
  description: 'Common properties for search result items',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export default SearchResultItem;
