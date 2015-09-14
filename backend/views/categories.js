var express = require('express');
var router = express.Router();
var Category = require('../models/category-model');


router.get('/', function(req, res) {
    var ps = Promise.all([
        Category.all(),
        Category.count()
    ]);

    ps.then(function(data){
        console.log('count : ', data[1]);
        res.render('templates/category/categories',
            {
                categories: data[0],
                total: data[1].total
            }
        );
    });
});

module.exports = router;
