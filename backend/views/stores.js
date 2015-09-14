var express = require('express');
var router = express.Router();
var Store = require('../models/store-model');


router.get('/', function(req, res) {
    var ps = Promise.all([
        Store.all(),
        Store.count()
    ]);

    ps.then(function(data){
        console.log('count : ', data[1]);
        res.render('templates/store/stores',
            {
                stores: data[0],
                total: data[1].total
            }
        );
    });
});

module.exports = router;
