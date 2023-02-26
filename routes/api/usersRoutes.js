const router = require("express").Router();

// Importing controller functions using object destructuring
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addUserFriend,
  removeUserFriend,
} = require("../../controllers/usersController");

// Route for getting all users and creating a new user
router.route("/").get(getUsers).post(createUser);

// Route for getting a single user, updating a user, and deleting a user
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// Route for adding a friend to a user and removing a friend from a user
router
  .route("/:userId/friends/:friendId")
  .post(addUserFriend)
  .delete(removeUserFriend);

module.exports = router;
