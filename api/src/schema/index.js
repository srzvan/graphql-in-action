import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLNonNull, GraphQLInt } from "graphql";

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    currentTime: {
      type: GraphQLString,
      resolve: () => {
        const isoString = new Date().toISOString();

        return isoString.slice(11, 19);
      },
    },
    sumNumbersInRange: {
      type: new GraphQLNonNull(GraphQLInt),
      args: {
        begin: { type: new GraphQLNonNull(GraphQLInt) },
        end: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: function (_, { begin, end }) {
        let sum = 0;

        for (let i = begin; i <= end; i++) {
          sum += i;
        }

        return sum;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});
