const { User, Reaction, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers: (req, res) => {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a user
  getSingleUser: (req, res) => {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        user
          ? res.json(user)
          : res.status(404).json({ message: "No user associated with that ID" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create new user
  createUser: (req, res) => {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete user
  deleteUser: (req, res) => {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) throw new Error("No user associated with that ID");
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() =>
        res.json({
          message: "User and thoughts associated deleted successfully!",
        })
      )
      .catch((err) =>
        res.status(404).json({ message: err.message || "Something went wrong" })
      );
  },

  // Update user
  updateUser: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) =>
        user
          ? res.json(user)
          : res
              .status(404)
              .json({ message: "No user found with that ID provided" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add user friend
  addUserFriend: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend
  removeUserFriend: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
