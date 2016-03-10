var sqlite3 = require('sqlite3');
var os = require('os');
var path = require('path');
var fs = require('fs');
var config = require('./config');

var configFilename = config()['db']['filename'];

var USERSFILES = os.type() === 'Windows_NT' ? 'AppData/Roaming' : 'Library';
var DIRNAME = path.join(os.homedir(), USERSFILES, 'R-Expenses');
if (!fs.existsSync(DIRNAME)){
    fs.mkdir(DIRNAME);
}

var currentDB;
function createDB(database) {
    console.log('CURRENT DB : ', currentDB);
    if (currentDB) {
        console.log('Reuse database :: ', currentDB);
        return currentDB;
    }
    console.log('database param : ', database);
    configFilename = database || configFilename;
    console.log('Create database :: ', path.join(DIRNAME, configFilename));
    const FILENAME = configFilename === ':memory:' ? ':memory:' : path.join(DIRNAME, configFilename);
    currentDB = new sqlite3.Database(FILENAME);
    return currentDB;
}

function dropSchemaSql() {
    console.log('Drop schema... ');
    return [
        `DROP TABLE IF EXISTS store;`,
        `DROP TABLE IF EXISTS spender;`,
        `DROP TABLE IF EXISTS category;`,
        `DROP TABLE IF EXISTS expense;`,
        `DROP TABLE IF EXISTS exp2spender_assoc;`];
}

function createSchemaSql() {
    console.log('Creating new schema... ');
    return [
        `CREATE TABLE store (
        	id INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
        	name VARCHAR NOT NULL UNIQUE
        );`,
        `CREATE TABLE spender (
        	id INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
        	name VARCHAR NOT NULL UNIQUE
        );`,
        `CREATE TABLE category (
            id INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
            name VARCHAR UNIQUE
        );`,
        `CREATE TABLE expense (
        	id INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,
        	amount FLOAT,
        	exp_date DATE,
        	category_id INTEGER,
        	store_id INTEGER,
        	FOREIGN KEY(category_id) REFERENCES category (id),
        	FOREIGN KEY(store_id) REFERENCES store (id)
        );`,
        `CREATE TABLE exp2spender_assoc (
        	exp_id INTEGER,
        	spender_id INTEGER,
        	FOREIGN KEY(exp_id) REFERENCES expense (id),
        	FOREIGN KEY(spender_id) REFERENCES spender (id)
        )`];
}

module.exports = {
    sqlite: createDB(),
    createDB,
    createSchemaSql,
    dropSchemaSql
};
