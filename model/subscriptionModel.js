const mongoose = require('mongoose');

var userModel = require('../model/userModel');

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'you should enter subscription name'],
        unique: false,
    },
    status: {
        type: String,
        enum: {
            values: ['active', 'deactive'],
            message: '{VALUE} is not supported',
        },
        default: 'deactive',
    },
    price: {
        type: Number,
        required: [true, 'you should enter subscription price'],
    },
    user_id: {
        type: String,
        required: [true, 'you should enter subscription user_id'],
        validate: {
            isAsync: true,
            validator: function (id) {
                return new Promise((resolve, reject) => {
                    userModel.findOne({ _id: id }, (err, result) => {
                        if (result) {
                            resolve(true);
                        } else {
                            reject(
                                new Error(`User with id ${id} does not exist.`)
                            );
                        }
                    });
                });
            },
            message: 'User with id {VALUE} does not exist.',
        },
    },
    last_invoice_time: {
        type: Date,
        default: Date.now(),
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

const subscription = mongoose.model('subscription', subscriptionSchema);
module.exports = subscription;
