const express = require('express');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  graphql,
} = require('graphql');

const app = express();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      message: {
        type: GraphQLString,
        resolve() {
          return 'Hello World';
        },
      },
    },
  }),
});

app.get('/', (req, res) => {
  graphql(
    schema,
    `
      {
        message
      }
    `
  )
    .then((r) => res.json(r))
    .catch(res.json);
});

app.listen(5000, () => {
  console.log(`Listen port 5000`);
});
