const User = require('../models/user');
const Course = require('../models/course');

module.exports = {
  Query: {
    async getUsers() {
      return await User.find();
    },
    async getUser(obj, { id }) {
      return await User.findById(id);
    },
  },
  Mutation: {
    async signUp(obj, { input }) {
      const user = new User(input);

      await user.save();

      return user;
    },
    async logIn(obj, { input }) {
      try {
        return (user = User.authenticate(input));
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
  User: {
    async courses(u) {
      return await Course.find({ user: u.id });
    },
  },
};
