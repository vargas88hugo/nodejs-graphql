const express = require('express');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { merge } = require('lodash');

const courseTypeDefs = require('./types/course.types');
const courseResolvers = require('./resolvers/course.resolvers');

mongoose.connect(
  'mongodb://localhost/graphql',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Conneted with Mongo...')
);

const app = express();

const typeDefs = `
  type Alert {
    message: String
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, courseTypeDefs],
  resolvers: merge(resolvers, courseResolvers),
});

app.use(express.json());
app.use('/graphql', graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(5000, () => console.log(`Listen in port 5000`));
