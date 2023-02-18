const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'you should enter username'],
        unique: true,
    },
    credit: {
        type: Number,
        unique: false,
        default: 0,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const user = mongoose.model('user', userSchema);
module.exports = user;
