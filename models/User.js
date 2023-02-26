const { Schema, model } = require("mongoose");

// create user schema
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought", //reference to Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", //reference to User model for friends
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, //include virtual properties when using toJSON()
    },
  }
);

// add virtual property friendCount to retrieve length of users friends
userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

// create User model
const User = model("User", userSchema);

module.exports = User; //export User model
