var db = require('../db').sqlite;
var _ = require('lodash');

var Store = {
    all: function() {
        return new Promise(function(resolve, reject){
            var onFetch = function (err, data) {
                if (err) throw new Error(err);
                console.log('resolved store');
                resolve(data);
            };
            console.log('promise store');
            db.all('SELECT s.id, s.name, count(e.id) used FROM store s INNER JOIN expense e ON e.store_id = s.id GROUP BY upper(name);', onFetch);
        });
    },
    count: function() {
        return new Promise(function(resolve, reject){
            var onFetch = function (err, data) {
                if (err) throw new Error(err);
                console.log('resolved store');
                resolve(data);
            };
            console.log('promise store');
            db.get('SELECT count(*) total FROM store;', onFetch);
        });
    }
};


module.exports = Store;
