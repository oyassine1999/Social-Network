// Import required modules from Mongoose
const { Schema, model } = require("mongoose");

// Import the reaction schema for embedding
const reactionSchema = require("./Reaction");

// Define the thought schema
const thoughtSchema = new Schema(
  {
    // The text of the thought
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },

    // The date the thought was created
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => new Date(date).toLocaleDateString(),
    },

    // The username of the user that created the thought
    username: {
      type: String,
      required: true,
    },

    // The reactions to the thought (embedded array of reaction documents)
    reactions: [reactionSchema],
  },
  {
    // Enable virtual properties and getters
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Define a virtual property to retrieve the count of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return `${this.reactions.length}`;
});

// Create the Thought model using the thought schema
const Thought = model("Thought", thoughtSchema);

// Export the Thought model for use in other modules
module.exports = Thought;
