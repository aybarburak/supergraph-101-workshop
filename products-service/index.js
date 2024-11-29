const { ApolloServer } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const fs = require('fs');
const { gql } = require('apollo-server');
const typeDefs = gql(fs.readFileSync('schema.graphql', { encoding: 'utf-8' }));
const products = [
  { id: "1", name: "Laptop", price: 999.99 },
  { id: "2", name: "Phone", price: 499.99 },
];

const resolvers = {
  Query: {
    products: () => products,
    product: (_, { id }) => {
      return products.find((product) => product.id === id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Products service ready at ${url}`);
});
