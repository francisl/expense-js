var Category = require('../models/category-model');
var Spender = require('../models/spender');
var Stores = require('../models/store-model');
var Expense = require('../models/expense');

module.exports = (app) => {
    app.post('/api/invoice', (req, res) => {
        var form = req.body;
        console.log('form data : ', form);

        Expense.create(
            form.category,
            form.store,
            form.date,
            form.amount,
            form.spenders
        )
        .then((data) => {
            res.json({expenses: data});
        })
        .catch((err) => {
            console.log('return conflict : ', err);
            res.sendStatus(409, err);
        });
    });
};
