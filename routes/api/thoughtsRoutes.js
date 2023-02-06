const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addThoughtsReaction,
  removeThoughtsReaction,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addThoughtsReaction);

// /api/:thoughtId/reactions/:reactionId
router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(removeThoughtsReaction);

module.exports = router;
