const Course = require('../models/course');
const User = require('../models/user');

module.exports = {
  Query: {
    async getCourses(obj, { page, limit }) {
      let courses = Course.find();

      if (page !== undefined) {
        courses = courses.limit(limit).skip((page - 1) * limit);
      }

      return await courses;
    },
    async getCourse(obj, { id }) {
      return await Course.findById(id);
    },
  },
  Mutation: {
    async addCourse(obj, { input, user }) {
      const userGet = await User.findById(user);
      const course = new Course({ ...input, user });

      await course.save();

      await userGet.courses.push(course);

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
