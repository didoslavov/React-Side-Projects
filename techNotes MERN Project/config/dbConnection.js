const mongoose = require('mongoose');

const connetDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connetDB;
