const express = require('express');

const invoiceManager = require('./utils/invoiceManager');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var router = require('./routes/routes');

app.route('/health').get((req, res) =>
    res.status(200).json({
        status: 'success',
        data: {
            healthState: 'healthy',
        },
    })
);

app.use(router);

exports.routes = app;
