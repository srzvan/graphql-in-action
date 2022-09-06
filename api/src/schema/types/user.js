import { GraphQLID, GraphQLString, GraphQLNonNull, GraphQLObjectType } from 'graphql';

// import Task from './task';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User entity',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: {
      type: GraphQLString,
      resolve: (source) => {
        if (source.firstName && source.lastName) {
          return `${source.firstName} ${source.lastName}`;
        }

        if (source.firstName && !source.lastName) {
          return source.firstName;
        }

        if (!source.firstName && source.lastName) {
          return source.lastName;
        }
      },
    },
    username: { type: new GraphQLNonNull(GraphQLString) },
    // createdAt: {
    //   type: new GraphQLNonNull(GraphQLString),
    //   resolve: (source) => source.createdAt.toISOString(),
    // },
    // taskList: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Task))),
  },
});

export default User;
