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
    users: () => {
      const usersWithProducts = users.map((user) => {
        const userProducts = products.filter(
          (product) => user.favorites.includes(product.id)
        );

        const userProductsWithPrice = userProducts.map((product) => {
          const price = prices.find((p) => p.id === product.price);

          if (price != undefined) {
            var result = { ...product, price };
            return result;
          }
        });

        return { ...user, products: userProductsWithPrice };
      });

      return usersWithProducts;
    },
    user: (_, { id }) => users.find((user) => user.id === id),
    products: () => {
      const productsWithPrice = products
        //.filter((product) => prices.some((price) => price.id === product.price))
        .map((product) => {
          const price = prices.find((p) => p.id === product.price);

          if (price != undefined) {
            var result = { ...product, price };
            return result;
          }
        });

      return productsWithPrice;
    },
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
