const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const thoughtController = require('../controllers/thought');

router.get('/', authenticate, thoughtController.getThoughts);
router.get('/:id', authenticate, thoughtController.getThoughtById);
router.post('/', authenticate, thoughtController.createThought);
router.put('/:id', authenticate, thoughtController.updateThought);
router.delete('/:id', authenticate, thoughtController.deleteThought);

module.exports = router;