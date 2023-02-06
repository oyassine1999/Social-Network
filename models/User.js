const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    //arr referncing Thought model
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual friendCount to retrieve length of users friends
userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

//Initialize the User model
const User = model("User", userSchema);

module.exports = User;
