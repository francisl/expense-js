var sqlite3 = require('sqlite3');
var os = require('os');
var path = require('path');
var fs = require('fs');

var USERSFILES = os.type() === 'Windows_NT' ? 'AppData/Roaming' : 'Library';
var DIRNAME = path.join(os.homedir(), USERSFILES, 'R-Expenses');
if (!fs.existsSync(DIRNAME)){
    fs.mkdir(DIRNAME);
}

var FILENAME = 'expenses.sqlite';
var DEVFILENAME = 'expenses-dev.sqlite';

module.exports = {
    sqlite: new sqlite3.Database(path.join(DIRNAME, DEVFILENAME))
};