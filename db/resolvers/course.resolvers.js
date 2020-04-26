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
    async updateCourse(obj, { id, input }) {
      return await Course.findByIdAndUpdate(id, input);
    },
    async deleteCourse(obj, { id }) {
      await Course.deleteOne({ _id: id });

      return {
        message: `The course with the index ${id} has been deleted`,
      };
    },
  },
};
