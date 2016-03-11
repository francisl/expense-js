var Category = require('../models/category-model');

module.exports = (app) => {
    app.get('/api/category', (req, res) => {
        const ps = Promise.all([Category.all()]);
        ps.then(function(data){
            console.log('sending category >>>');
            res.json({categories: data[0]});
        });
    });
};
