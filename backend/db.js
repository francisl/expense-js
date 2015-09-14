var sqlite3 = require('sqlite3');

var FILENAME = '/Users/sanctus/Library/R-Expenses/expenses.sqlite';

module.exports = {
    sqlite: new sqlite3.Database(FILENAME)
};
