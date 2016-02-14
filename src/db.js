var sqlite3 = require('sqlite3');
var os = require('os');
var path = require('path');
var fs = require('fs');
var config = require('./config');

const configFilename = config()['db']['filename'];

var USERSFILES = os.type() === 'Windows_NT' ? 'AppData/Roaming' : 'Library';
var DIRNAME = path.join(os.homedir(), USERSFILES, 'R-Expenses');
if (!fs.existsSync(DIRNAME)){
    fs.mkdir(DIRNAME);
}

function createDB() {
    console.log('Running database :: ', configFilename);
    const FILENAME = configFilename === ':memory:' ? ':memory:' : path.join(DIRNAME, configFilename);
    return new sqlite3.Database(FILENAME, sqlite3.OPEN_READWRITE);
}

function createSchemaSql() {
    return `
    BEGIN TRANSACTION;
    CREATE TABLE "store" (
    	`id`	INTEGER NOT NULL,
    	`name`	VARCHAR NOT NULL UNIQUE,
    	PRIMARY KEY(id,name)
    );
    CREATE TABLE spender (
    	id INTEGER NOT NULL,
    	name VARCHAR,
    	PRIMARY KEY (id)
    );
    CREATE TABLE expense (
    	id INTEGER NOT NULL,
    	amount FLOAT,
    	exp_date DATE,
    	category_id INTEGER,
    	store_id INTEGER,
    	PRIMARY KEY (id),
    	FOREIGN KEY(category_id) REFERENCES category (id),
    	FOREIGN KEY(store_id) REFERENCES store (id)
    );
    CREATE TABLE exp2spender_assoc (
    	exp_id INTEGER,
    	spender_id INTEGER,
    	FOREIGN KEY(exp_id) REFERENCES expense (id),
    	FOREIGN KEY(spender_id) REFERENCES spender (id)
    );
    CREATE TABLE category (
    	id INTEGER NOT NULL,
    	name VARCHAR,
    	PRIMARY KEY (id)
    );
    COMMIT;

    `
}
module.exports = {
    sqlite: createDB(),
    createSchemaSql: createSchemaSql
};
