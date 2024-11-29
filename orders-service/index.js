const { ApolloServer } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const fs = require('fs');
const { gql } = require('apollo-server');
const typeDefs = gql(fs.readFileSync('schema.graphql', { encoding: 'utf-8' }));

// Mocked data for Orders
const orders = [
  { id: "1", product: { id: "1" }, user: { id: "1" }, quantity: 2 },
  { id: "2", product: { id: "2" }, user: { id: "2" }, quantity: 1 },
];

const resolvers = {
  Query: {
    orders: () => orders,
    order: (_, { id }) => orders.find(order => order.id === id),
  },
  
  Order: {
    product: (order) => ({
      __typename: "Product",
      id: order.product.id,
    }),
    user: (order) => ({
      __typename: "User",
      id: order.user.id,
    }),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Orders service ready at ${url}`);
});
