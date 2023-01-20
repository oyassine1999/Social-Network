const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  thoughts: [{
    type: mongoose.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: {
    virtuals: true
  },
  id: false
});

userSchema.virtual('friendCount', {
  ref: 'User',
  localField: '_id',
  foreignField: 'friends',
  count: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;