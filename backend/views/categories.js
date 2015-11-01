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
        res.render('templates/listing',
            {
                elements: data[0],
                listingType: 'categories',
                total: data[1].total
            }
        );
    });
});

router.post('/', function(req, res) {
    console.log('param : ', req.body);
    var ps = Promise.all([
        Category.where([12, 13])
    ]);

    ps.then(function(data){
        res.render('templates/listing/listing',
            {
                master: data[0],
                elements: data[0],
                listingType: 'categories',
            }
        );
    });
});

module.exports = router;
