var path = require('path');
var fs = require('fs');
var os = require('os');
var process = require('process');

const CONFIG_PATH = function() {
	const OS_HOME_DATA = os.type() === 'Windows_NT'? '\AppData\\Local' : 'Documents';
	return path.join(os.homedir(), OS_HOME_DATA);
}();


class Config {
	constructor() {
		console.log('loading config file');
		this.configData = this.getConfig();
		this.dirname = this.getDirName();
	}

	getConfig() {
		const NODE_ENV = process.env.NODE_ENV || 'default';
		const FILE = path.join(process.cwd(), 'config', NODE_ENV.trim(' ') + '.json');
		console.log('node env : ', FILE);
		const CONFIG_JSON = fs.readFileSync(FILE);
		return JSON.parse(CONFIG_JSON);
	}

	getDirName() {
		console.log('USERSFILES ', CONFIG_PATH);
		return path.join(CONFIG_PATH, 'R-Expenses');
	}

	getDbFile() {
		return path.join(this.dirname, this.configData.db.filename);
	}

	getDBFilePath() {
		const DB_FILE = this.getDbFile();
		console.log('get db filename ::: ', DB_FILE);
		return this.configData.db.filename === ':memory:' ? ':memory:' : this.getDbFile();
	}
}

module.exports = new Config();
