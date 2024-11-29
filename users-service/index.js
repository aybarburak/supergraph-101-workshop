const { ApolloServer } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/subgraph');
const fs = require('fs');
const { gql } = require('apollo-server');
const typeDefs = gql(fs.readFileSync('schema.graphql', { encoding: 'utf-8' }));

const users=[
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "John", email: "john@example.com" }
];

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => {
      return users.find((user) => user.id === id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Users service ready at ${url}`);
});
