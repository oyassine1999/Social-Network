const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(
        process.env.MONGODB_URI || 'mongodb://localhost:27017/myDatabase',
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

    mongoose.connection.on('connected', () => {
        console.log('Mongoose default connection is open');
    });

    mongoose.connection.on('error', (err) => {
        console.log(`Mongoose connection error: ${err}`);
        process.exit(1);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose default connection is disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection is disconnected due to application termination');
            process.exit(0);
        });
    });
};