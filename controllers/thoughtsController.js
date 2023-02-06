const { User, Reaction, Thought } = require("../models");

module.exports = {
  //Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-_v")
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No ID associated with that thought !!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Create a thought w/ the associated user
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findByIdAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought._id } }
        ).then((user) => {
          res.json(thought);
        });
      })
      .catch((err) => res.status(500).json(err));
  },

  //Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No thought associated with that ID" })
          : User.findByIdAndUpdate(
              { username: user.username },
              { $pull: { thoughts: user._id } }
            )
      )
      .then(() => res.json({ message: "Thought deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //Update a thought
  updateThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No thought associated with that ID" })
          : User.findOneAndUpdate(
              { username: user.username },
              { $pull: { thoughts: user._id } }
            )
      )
      .then(() => res.json({ message: "Thought deleted succesfully!" }))
      .catch((err) => res.status(500).json(err));
  },

  //add reactions to thoughts
  addThoughtsReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } }
    )
      .then((user) => {
        res.status(200).json(user);
      })

      .catch((err) => res.status(500).json(err));
  },

  //remove and update thoughts w/o reaction
  removeThoughtsReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    )
      .then((user) => {
        res.status(200).json(user);
      })

      .catch((err) => res.status(500).json(err));
  },
};
