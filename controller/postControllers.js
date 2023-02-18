var userModel = require('../model/userModel');
var subscriptionModel = require('../model/subscriptionModel');

exports.toggleSubscription = (req, res) => {
    console.log('hello from toggleSubscription!!');

    subscriptionModel
        .findByIdAndUpdate(req.body.id, {
            status: req.body.status,
            last_invoice_time: Date.now(),
        })
        .then((subscription) => {
            if (!subscription)
                return res.status(404).json({
                    status: 'error',
                    message: `error: subscription not found`,
                });

            console.log('subscription updated');
            console.log(subscription);

            res.status(200).json({
                status: 'success',
                message: `subscription ${subscription.name} updated successfully`,
                id: subscription._id,
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 'error',
                message: `error: ${error.message}`,
            });
        });
};

exports.newSubscription = (req, res) => {
    console.log('hello from newSubscription!!');

    subscriptionModel
        .create(req.body)
        .then((newSubscription) => {
            console.log('new subscription saved');
            console.log(newSubscription);

            res.status(200).json({
                status: 'success',
                message: `subscription ${newSubscription.name} saved successfully`,
                id: newSubscription._id,
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 'error',
                message: `error: ${error.message}`,
            });
        });
};

exports.addCredit = (req, res) => {
    console.log('hello from addCredit!!');
    userModel
        .findByIdAndUpdate(req.body.id, {
            $inc: {
                credit: req.body.credit,
            },
        })
        .then((user) => {
            console.log('credit changed');

            res.status(200).json({
                status: 'success',
                message: `user ${user.username} saved successfully`,
                credit: user.credit + credit,
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 'error',
                message: `error: ${error.message}}`,
            });
        });
};

exports.createUser = (req, res) => {
    console.log('hello from createUser!!');
    userModel
        .create(req.body)
        .then((newUser) => {
            console.log('new person saved');
            console.log(newUser);

            res.status(200).json({
                status: 'success',
                message: `user ${newUser.username} saved successfully`,
                id: newUser._id,
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 'error',
                message: `error: ${error.message}}`,
            });
        });
};
