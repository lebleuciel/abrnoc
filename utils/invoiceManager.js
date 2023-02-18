var userModel = require('../model/userModel');
var subscriptionModel = require('../model/subscriptionModel');
var invoiceModel = require('../model/invoiceModel');

exports.runner = () => {
    console.log('run');
    subscriptionModel
        .find({
            status: 'active',
            last_invoice_time: {
                $lt: Date.now() - process.env.INVOICE_INTERVAl,
            },
        })
        .then((data) => {
            data.forEach(async (row) => {
                try {
                    userData = await userModel.findById(row.user_id);
                    credit = userData.credit;
                    invoice_time = row.last_invoice_time.getTime();

                    while (
                        invoice_time <=
                            Date.now() - process.env.INVOICE_INTERVAl &&
                        credit >= row.price
                    ) {
                        await invoiceModel.create({
                            price: row.price,
                            user_id: row.user_id,
                            subscription_id: row._id,
                            start_at: invoice_time,
                            end_at:
                                invoice_time + +process.env.INVOICE_INTERVAl,
                        });

                        invoice_time += +process.env.INVOICE_INTERVAl;
                        credit -= row.price;
                    }

                    await subscriptionModel.findByIdAndUpdate(row._id, {
                        last_invoice_time: invoice_time,
                    });
                    await userModel.findByIdAndUpdate(row.user_id, {
                        credit: credit,
                    });

                    if (credit <= 0)
                        await subscriptionModel.updateMany(
                            { user_id: row.user_id },
                            { status: 'inactive' }
                        );
                } catch (err) {
                    console.error('there is error in invoice manager');
                    console.error(`error: ${err}`);
                }
            });
        })
        .catch((err) => {
            console.error('there is error in invoice manager');
            console.error(`error: ${err}`);
        });
};

setInterval(exports.runner, 10000);
