const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  hashedPassword: {
    type: String,
  },
  token: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

UserSchema.virtual('password');

UserSchema.pre('validate', async function () {
  if (this.password === undefined) return;

  try {
    this.hashedPassword = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

module.exports = User = mongoose.model('User', UserSchema);
