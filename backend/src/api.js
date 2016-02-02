var Category = require('./models/category-model');
var Spender = require('./models/spender');
var Stores = require('./models/store-model');

module.exports = (app) => {
    app.get('/api/category', (req, res) => {
        const ps = Promise.all([Category.all(), Spender.all()]);
        ps.then(function(data){
            console.log('sending category : ', data[0]);
            res.json({categories: data[0]});
        });
    });

    app.post('/api/invoice', (req, res) => {
        var formData = req.body;
        console.log('form data : ', req.body);

        const ps = Promise.all([
            // Category.where(),
            // Store.get(),
            // Spender.all()
        ]);

        ps.then(function(data){
            console.log('sending category : ', data[0]);
            res.json({});
        });
    });

    app.get('/api/spenders', (req, res) => {
        const ps = Promise.all([Spender.all()]);
        ps.then(function(data){
            console.log('sending spenders : ', data[0]);
            res.json({spenders: data[0]});
        });
    });

    app.get('/api/stores', (req, res) => {
        const ps = Promise.all([Stores.all()]);
        ps.then(function(data){
            console.log('sending stores : ', data[0]);
            res.json({stores: data[0]});
        });
    });
}
