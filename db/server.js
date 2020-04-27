const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');
const jwt = require('jsonwebtoken');

const courseTypeDefs = require('./types/course.types');
const userTypeDefs = require('./types/user.types');
const courseResolvers = require('./resolvers/course.resolvers');
const userResolvers = require('./resolvers/user.resolvers');
const User = require('./models/user');

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

const server = new ApolloServer({
  typeDefs: [typeDefs, courseTypeDefs, userTypeDefs],
  resolvers: merge(resolvers, courseResolvers, userResolvers),
  context: async function ({ req }) {
    let token = null;
    let currentUser = null;

    token = req.headers['authorization'];

    if (!token) {
      return {};
    }

    const decodedInfo = jwt.verify(token, 'no_secret_enjoy');

    if (token && decodedInfo) {
      currentUser = await User.findById(decodedInfo.id);

      if (!currentUser) throw new Error('Invalid token');
    }
    if (!currentUser) throw new Error('Needs a token');

    return {
      token,
      currentUser,
    };
  },
});

app.use(express.json());

server.applyMiddleware({ app });

app.listen(5000, () => console.log(`Listen in port 5000`));
