var subscriptionModel = require('../model/subscriptionModel');
var invoiceModel = require('../model/invoiceModel');

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
    console.log('hello from showInvoices!!');

    invoiceModel
        .find({
            subscription_id: req.body.subscription_id,
        })
        .then((data) => {
            let result = [];
            data.forEach((row) => {
                result.push({
                    id: row._id,
                    price: row.price,
                    start_at: row.start_at,
                    end_at: row.end_at,
                });
            });

            res.status(200).json({
                status: 'success',
                message: `get subscription: ${req.body.subscription_id} invoices successfully`,
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

exports.showAllInvoices = (req, res) => {
    console.log('hello from showAllInvoices!!');

    invoiceModel
        .find({
            user_id: req.body.user_id,
        })
        .then((data) => {
            let result = [];
            data.forEach((row) => {
                result.push({
                    id: row._id,
                    price: row.price,
                    start_at: row.start_at,
                    end_at: row.end_at,
                });
            });

            res.status(200).json({
                status: 'success',
                message: `get user: ${req.body.user_id} invoices successfully`,
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

exports.showAllExpences = (req, res) => {
    invoiceModel
        .find({
            user_id: req.body.user_id,
        })
        .then((data) => {
            let result = {};
            data.forEach((row) => {
                if (!(row.subscription_id in result))
                    result[row.subscription_id] = {
                        total_price: 0,
                        invoice_count: 0,
                    };
                console.log(result);
                result[row.subscription_id].total_price += row.price;
                result[row.subscription_id].invoice_count += 1;
            });

            res.status(200).json({
                status: 'success',
                message: `get user: ${req.body.user_id} all expences successfully`,
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
