const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

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
    getCourse(id: ID!): Course
  }

  type Mutation {
    addCourse(title: String!, views: Int): Course
    updateCourse(id: ID!, title: String!, views: Int): Course
  }
`);

const root = {
  getCourses() {
    return courses;
  },
  getCourse({ id }) {
    return courses.find((course) => id == course.id);
  },
  addCourse({ title, views }) {
    const id = String(courses.length + 1);
    const course = { id, title, views };

    courses.push(course);

    return course;
  },
  updateCourse({ id, title, views }) {
    const course = courses.find((course) => course.id == id);

    course.title = title;
    course.views = views;

    return course;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.json(courses);
});

app.listen(5000, () => {
  console.log('Listen in port 5000');
});
