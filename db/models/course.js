const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = Course = mongoose.model('Course', CourseSchema);
