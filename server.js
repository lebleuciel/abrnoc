const dotenv = require('dotenv');
const path = require('path');

let dotenvResult;

if (process.argv.indexOf('--config') !== -1)
    dotenvResult = dotenv.config({
        path: path.join(
            __dirname,
            '/',
            process.argv[process.argv.indexOf('--config') + 1]
        ),
    });
else
    dotenvResult = dotenv.config({
        path: path.join(__dirname, '.env/dev.env'),
    });

if (dotenvResult.error) {
    console.error(dotenvResult.error);
    process.exit();
}

const app = require('./app');
const mongoose = require('mongoose');
//to fix strict query error
mongoose.set('strictQuery', false);

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

const startApp = (port) => {
    const server = app.routes
        .listen(port, () => {
            console.log(`app running on port ${port}...`);
        })
        .on('error', (err) => {
            reject(err);
        });
};

mongoose
    .connect(DB, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('connection succesful');
        startApp(process.env.PORT);
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
