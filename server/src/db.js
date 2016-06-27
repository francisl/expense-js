var sqlite3 = require('sqlite3');
var config = require('./config');
var fs = require('fs');

function initPathIfNotCreated(dir) {
	console.log('INIT: Check if db dir exist: ', dir);
	if (!fs.existsSync(dir)){
		console.log('INIT: Create DB dir : ', dir);
	    fs.mkdirSync(dir);
	}
}

var currentDB;
function initDB(database) {
    if (currentDB) {
        console.info('Reuse database :: ', currentDB);
        return currentDB;
    }
	console.log('DB config filepath : ', config.getDBFilePath());
	initPathIfNotCreated(config.getDirName());
    currentDB = new sqlite3.Database(config.getDBFilePath());
	console.log('current db : ', currentDB);
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
    sqlite: initDB(),
    initDB,
    createSchemaSql,
    dropSchemaSql
};
