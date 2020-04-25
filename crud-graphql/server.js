const express = require('express');
const { buildSchema } = require('graphql');

const courses = require('./courses');

const app = express();

// ! means is obligatory and ID is a unique id
const schema = buildSchema(`
  type Course {
    id: ID!
    title: String!
    views: Int
  }

  type Query {
    getCourses: [Course]
  }
`);

app.get('/', (req, res) => {
  res.json(courses);
});

app.listen(5000, () => {
  console.log('Listen in port 5000');
});
