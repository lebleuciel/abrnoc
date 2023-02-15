const express = require('express');

const app = express();

app.route('/health').get((req, res) =>
    res.status(200).json({
        status: 'success',
        data: {
            healthState: 'healthy',
        },
    })
);

exports.routes = app;