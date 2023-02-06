const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => new Date(date).toLocaleDateString(),
    },

    //user that created this thought
    username: {
      type: String,
      required: true,
    },

    //reactions to the thought
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

//virtual reactionCount to retrieve the length of thoughts
thoughtSchema.virtual("reactionCount").get(function () {
  return `${this.reactions.length}`;
});

//Initialize the Thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
