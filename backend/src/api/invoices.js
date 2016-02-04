var Category = require('../models/category-model');
var Spender = require('../models/spender');
var Stores = require('../models/store-model');

module.exports = (app) => {
    app.post('/api/invoice', (req, res) => {
        var formData = req.body;
        console.log('form data : ', req.body);

        const ps = Promise.all([
            Category.getOrCreate(req.body.category),
            // Store.get(),
            // Spender.all()
        ]);

        ps.then(function(data){
            console.log('sending category : ', data[0].id);
            res.json({});
        });
    });
};
