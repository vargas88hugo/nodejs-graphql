const Course = require('../models/course');

module.exports = {
  Query: {
    async getCourses(obj, { page, limit }) {
      return await Course.find();
    },
    async getCourse(obj, { id }) {
      return await Course.findById(id);
    },
  },
  Mutation: {
    async addCourse(obj, { input }) {
      const course = new Course(input);

      await course.save();

      return course;
    },
    updateCourse(obj, { id, input }) {
      const { title, views } = input;
      const course = courses.find((course) => course.id == id);

      course.title = title;
      course.views = views;

      return course;
    },
    deleteCourse(obj, { id }) {
      courses = courses.filter((course) => course.id != id);

      return {
        message: `The course with the index ${id} has been deleted`,
      };
    },
  },
};
