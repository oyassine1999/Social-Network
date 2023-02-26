const router = require("express").Router();
const thoughtsController = require("../../controllers/thoughtsController");

// Routes for handling CRUD operations on thoughts
router
  .route("/")
  .get(thoughtsController.getThoughts)
  .post(thoughtsController.createThought);

router
  .route("/:thoughtId")
  .get(thoughtsController.getSingleThought)
  .put(thoughtsController.updateThought)
  .delete(thoughtsController.deleteThought);

// Routes for handling reactions to thoughts
router
  .route("/:thoughtId/reactions")
  .post(thoughtsController.addThoughtsReaction);

router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(thoughtsController.removeThoughtsReaction);

module.exports = router;

// This code sets up routes for handling CRUD operations on thoughts, as well as routes for handling reactions to thoughts. It uses the thoughtsController to handle these operations, which contains the logic for interacting with the database.
