const { User, Reaction, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    const thoughts = await Thought.find();
    res.json(thoughts);
  },

  async getSingleThought(req, res) {
    const thought = await Thought.findById(req.params.thoughtId).select("-__v");
    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }
    res.json(thought);
  },

  async createThought(req, res) {
    const thought = await Thought.create(req.body);
    await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: thought._id } }
    );
    res.json(thought);
  },

  async deleteThought(req, res) {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }
    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } }
    );
    res.json({ message: "Thought deleted!" });
  },

  async updateThought(req, res) {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: "No thought found with that ID" });
    }
    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: thought._id } }
    );
    res.json({ message: "Thought updated!" });
  },

  async addThoughtsReaction(req, res) {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    res.json(thought);
  },

  async removeThoughtsReaction(req, res) {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    res.json(thought);
  },
};
