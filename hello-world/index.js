const express = require('express');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  graphql,
} = require('graphql');

const app = express();

const courseType = new GraphQLObjectType({
  name: 'Course',
  fields: {
    title: { type: GraphQLString },
    views: { type: GraphQLInt },
  },
});

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
      course: {
        type: courseType,
        resolve() {
          return { title: 'GraphQL title', views: 1000 };
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
        course {
          title
        }
      }
    `
  )
    .then((r) => res.json(r))
    .catch(res.json);
});

app.listen(5000, () => {
  console.log(`Listen port 5000`);
});
