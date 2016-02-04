var express = require('express');
var router = express.Router();
var spenderModel = require('../models/spender');


router.get('/', function(req, res) {
    var ps = Promise.all([
        spenderModel.all()
    ]);

    ps.then(function(data){
        console.log('count : ', data[1]);
        res.render('templates/new_expense',
            { spenders: data[0] }
        );
    });
});

module.exports = router;
