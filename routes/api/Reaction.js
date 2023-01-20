const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const reactionController = require('../controllers/reaction');

router.get('/', authenticate, reactionController.getReactions);
router.post('/', authenticate, reactionController.createReaction);
router.put('/:id', authenticate, reactionController.updateReaction);
router.delete('/:id', authenticate, reactionController.deleteReaction);

module.exports = router;