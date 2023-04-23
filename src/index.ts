import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "node:fs";
import { Resolvers } from "./resolvers-types";

import users from "../data/users.json";
import products from "../data/products.json";
import prices from "../data/prices.json";

const typeDefs = readFileSync("./src/schema.graphql", "utf8");

const resolvers: Resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
    products: () => products.map((product) => {
      const price = prices.find((price) => price.id === product.price);

      return {
        id: product.id,
        name: product.name,
        desription: product.description,
        image: product.image,
        price: price,
      }
    }),
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
