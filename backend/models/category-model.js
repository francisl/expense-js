var db = require('../db').sqlite;
var _ = require('lodash');

var Category = {
    all: function() {
        return new Promise(function(resolve, reject){
            var onFetch = function (err, data) {
                if (err) throw new Error(err);
                console.log('resolved category');
                resolve(data);
            };
            console.log('promise category');
            db.all('SELECT c.id, c.name, count(e.id) used FROM category c INNER JOIN expense e ON e.category_id = c.id GROUP BY upper(name)', onFetch);
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
            db.get('SELECT count(*) total FROM category;', onFetch);
        });
    }
};


module.exports = Category;
