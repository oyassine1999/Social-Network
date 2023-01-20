const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => createdAtVal.toLocaleString()
  }
}, {
  _id: false
});

module.exports = reactionSchema;