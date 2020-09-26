var path = require('path');
var fs = require('fs');
var os = require('os');
var process = require('process');

const USER_CONFIG_PATH = function() {
	const OS_HOME_DATA = os.type() === 'Windows_NT'? '\AppData\\Local\\R-Expenses' : 'Documents/R-Expenses';
	return path.join(os.homedir(), OS_HOME_DATA);
}();

const USER_CONFIG_FILE = function() {
	return path.join(USER_CONFIG_PATH, 'config.json');
}();

const NODE_ENV = process.env.NODE_ENV || 'default';


class Config {
	constructor() {
		console.log('loading config file');
		this.configData = this.setEnvConfig();
		this.userConfigData = this.setUserConfig();
	}

	setUserConfig() {
		console.log('user config file : ', USER_CONFIG_FILE);
		const userConfigFile = fs.readFileSync(USER_CONFIG_FILE);
		return JSON.parse(userConfigFile);
	}

	setEnvConfig() {
		const envConfigFile = path.join(process.cwd(), 'config', NODE_ENV.trim(' ') + '.json');
		console.log('node env : ', envConfigFile);
		return JSON.parse(fs.readFileSync(envConfigFile));
	}

	getDbPath() {
		return this.userConfigData.dbPath;
	}

	getDbFullFilePath() {
		const dbPath = path.join(this.getDbPath(), this.configData.db.filename);
		console.log('DB Path : ', dbPath);
		return dbPath;
	}
	
	getDBFilePath() {
		return this.configData.db.filename === ':memory:' ? ':memory:' : this.getDbFullFilePath();
	}

}

module.exports = new Config();
