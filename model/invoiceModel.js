const mongoose = require('mongoose');

var userModel = require('../model/userModel');
var subscriptionModel = require('../model/subscriptionModel');

const invoiceSchema = new mongoose.Schema({
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
    subscription_id: {
        type: String,
        required: [true, 'you should enter subscription user_id'],
        validate: {
            isAsync: true,
            validator: function (id) {
                return new Promise((resolve, reject) => {
                    subscriptionModel.findOne({ _id: id }, (err, result) => {
                        if (result) {
                            resolve(true);
                        } else {
                            reject(
                                new Error(
                                    `Subscription with id ${id} does not exist.`
                                )
                            );
                        }
                    });
                });
            },
            message: 'Subscription with id {VALUE} does not exist.',
        },
    },
    start_at: {
        type: Date,
        required: true,
    },
    end_at: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

const invoice = mongoose.model('invoice', invoiceSchema);
module.exports = invoice;
