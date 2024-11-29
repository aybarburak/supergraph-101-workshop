const { ApolloServer } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const fs = require('fs');
const { gql } = require('apollo-server');
const typeDefs = gql(fs.readFileSync('schema.graphql', { encoding: 'utf-8' }));

// Mocked data for Orders, Products, and Users
const orders = [
  { id: "1", product: { id: "1" }, user: { id: "1" }, quantity: 2 },
  { id: "2", product: { id: "2" }, user: { id: "2" }, quantity: 1 },
];

const products = [
  { id: "1", name: "Laptop", price: 999.99 },
  { id: "2", name: "Phone", price: 499.99 },
];

const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "John", email: "john@example.com" },
];

const resolvers = {
  Query: {
    orders: () => orders,
    order: (_, { id }) => orders.find(order => order.id === id),
  },
  
  User: {
    orders: (user) => orders.filter((order) => order.user.id === user.id),
  },
  
  Product: {
    __resolveReference: (reference) => {
      return products.find((product) => product.id === reference.id);
    },
  },
  
  Order: {
    product: (order) => {
      return products.find((product) => product.id === order.product.id);
    },
    
    user: (order) => {
      return users.find((user) => user.id === order.user.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen(4003).then(({ url }) => {
  console.log(`🚀 Orders service ready at ${url}`);
});
