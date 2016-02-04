var Stores = require('../models/store-model');

module.exports = (app) => {

    app.get('/api/stores', (req, res) => {
        const ps = Promise.all([Stores.all()]);
        ps.then(function(data){
            console.log('sending stores : ', data[0]);
            res.json({stores: data[0]});
        });
    });
}