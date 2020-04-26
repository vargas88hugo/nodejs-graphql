module.exports = {
  Query: {
    getCourses(obj, { page, limit }) {
      if (page !== undefined) {
        return courses.slice(page * limit, (page + 1) * limit);
      }

      return courses;
    },
    getCourse(obj, { id }) {
      return courses.find((course) => id == course.id);
    },
  },
  Mutation: {
    addCourse(obj, { input }) {
      const id = String(courses.length + 1);
      const course = { id, ...input };

      courses.push(course);

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
