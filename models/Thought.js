const mongoose = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => createdAtVal.toLocaleString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, {
  toJSON: {
    virtuals: true
  },
  id: false
});

thoughtSchema.virtual('reactionCount', {
  ref: 'Reaction',
  localField: '_id',
  foreignField: 'thoughtId',
  count: true
});

const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;