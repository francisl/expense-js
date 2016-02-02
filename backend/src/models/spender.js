var db = require('../db').sqlite;
var _ = require('lodash');

var Spender = {
    all: function() {
        return new Promise(function(resolve, reject){
            var onFetch = function (err, data) {
                if (err) throw new Error(err);
                console.log('resolved spenders');
                resolve(data);
            };
            console.log('promise spenders');
            db.all('SELECT id, name FROM spender;', onFetch);
        });
    }
};


module.exports = Spender;
