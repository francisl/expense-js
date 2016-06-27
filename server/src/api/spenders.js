var Spender = require('../models/spender');

module.exports = (app) => {
    app.get('/api/spenders', (req, res) => {
        const ps = Promise.all([Spender.all()]);
        ps.then(function(data){
            console.log('sending >>>');
            res.json({spenders: data[0]});
        });
    });
};
