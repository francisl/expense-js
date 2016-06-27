var path = require('path');
var fs = require('fs');
var os = require('os');
var process = require('process');


class Config {
	constructor() {
		console.log('loading config file');
		this.configData = this.getConfig();
		this.dirname = this.getDirName();
	}

	getConfig() {
		const NODE_ENV = process.env.NODE_ENV || 'default';
		const FILE = path.join(process.env.PWD, 'config', NODE_ENV + '.json');
		const CONFIG_JSON = fs.readFileSync(FILE);
		return JSON.parse(CONFIG_JSON);
	}

	getDirName() {
		const USERSFILES = os.type() === 'Windows_NT' ? 'AppData/Roaming' : 'Library';
		return path.join(os.homedir(), USERSFILES, 'R-Expenses');
	}

	getDbFilename() {
		console.log('config data : ', this.configData);
		return this.configData.db.filename;
	}

	getDBFilePath() {
		console.log('get db filename ::: ', this.getDbFilename());
		return this.getDbFilename()  === ':memory:' ? ':memory:' : path.join(this.dirname, this.getDbFilename());
	}
}

module.exports = new Config();
