var subscriptionModel = require('../model/subscriptionModel');

exports.landing = (req, res) => {
    res.send('working!!');
    console.log('hello from landing!!');
};

exports.showSubscriptions = (req, res) => {
    console.log('hello from showSubscriptions!!');

    subscriptionModel
        .find({
            user_id: req.body.user_id,
        })
        .then((data) => {
            console.log(data);
            let result = [];
            data.forEach((row) => {
                result.push({
                    id: row._id,
                    price: row.price,
                    status: row.status,
                    created_at: row.created_at,
                });
            });

            res.status(200).json({
                status: 'success',
                message: `get user: ${req.body.user_id} subscriptions successfully`,
                data: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 'error',
                message: `error: ${error.message}`,
            });
        });
};

exports.showInvoices = (req, res) => {
    res.send('working!!');
    console.log('hello from showInvoices!!');
};

exports.showAllInvoices = (req, res) => {
    res.send('working!!');
    console.log('hello from showAllInvoices!!');
};

exports.showAllExpences = (req, res) => {
    res.send('working!!');
    console.log('hello from showAllExpences!!');
};
