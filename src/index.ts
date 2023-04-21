import { readFileSync } from 'node:fs';
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Resolvers } from './resolvers-types';

import users from '../data/users.json';

const typeDefs = readFileSync('./schema.graphql', 'utf8')

const resolvers: Resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => Promise.resolve(users.find(user => user.id === id)),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
