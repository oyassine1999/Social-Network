const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const thoughtsRoutes = require('./routes/thoughts');
const reactionRoutes = require('./routes/reactions');
const cors = require('cors');
const logger = require('./middleware/logger');

// connect to database
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/myDatabase',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.json());
app.use(cors());
app.use(logger);
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtsRoutes);
app.use('/api/reactions', reactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});