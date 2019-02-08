const path = require('path')
const fs = require('fs')
const process = require('process')
const multios = require('./utils/ospath')

const NODE_ENV = process.env.NODE_ENV || 'default'

class UserConfig {
	static getFile() {
		return path.join(multios.appLocalPath(), 'config.json')
	}

	static createUserConfigWhenNeeded() {
		if (fs.existsSync(UserConfig.getFile())) return

		console.log('INIT: Create user config : ', UserConfig.getFile())
		if (!fs.existsSync(multios.appLocalPath())) {
			fs.mkdirSync(multios.appLocalPath())
		}
		const content = { dbPath: multios.appDataPath() }
		fs.writeFileSync(UserConfig.getFile(), JSON.stringify(content), (err) => {
			if (err) throw err
			console.log("New Config file created!")
		})
	}

	constructor() {
		console.log('loading user config')
		this.userConfigData = this.load()
	}

	load() {
		UserConfig.createUserConfigWhenNeeded()
		return JSON.parse(fs.readFileSync(UserConfig.getFile()))
	}

	get dbDirPath() {
		if (this.userConfigData.dbPath) return this.userConfigData.dbPath
	}
}

class DBConfig {
	constructor() {
		console.log('loading db config')
		this.configData = this.load()
		this.userConfig = new UserConfig()
		this.dbpath = path.join(this.userConfig.dbDirPath, 'data')
		this.newDB = false
		this.initPathIfNotCreated(this.dbpath)
		console.log('db path : ', this.dbpath)
	}

	load() {
		console.log('loading application config : ', envConfigFile)
		const envConfigFile = path.join(process.cwd(), 'config', NODE_ENV.trim(' ') + '.json')
		return JSON.parse(fs.readFileSync(envConfigFile))
	}

	initPathIfNotCreated(dir) {
		if (!fs.existsSync(dir)){
			console.log('INIT: Create DB dir : ', dir)
			fs.mkdirSync(dir)
			this.newDB = true
		}
	}
	getDBPath() {
		return this.configData.db.filename === ':memory:' ? ':memory:' : this.getDbFile()
	}

	getDbFile() {
		const dbFile = path.join(this.dbpath, this.configData.db.filename)
		console.log('Using DB file : ', dbFile)
		return dbFile
	}
}

module.exports = new DBConfig()
