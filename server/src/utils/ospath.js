const path = require('path')
const process = require('process')
const os = require('os')

const APP_DIR = 'R-Expenses'

const appDir = () => (os.type() === 'Linux' ? '.' + APP_DIR : APP_DIR)

function osAppLocalPath() {
	switch (os.type()) {
		case 'Windows_NT':
			return process.env.APPDATA
		case 'Darwin':
			return path.join(os.homedir(), 'Library', 'Preferences')
		default:
			return os.homedir()
	}
}

function osAppDataPath() {
	switch (os.type()) {
		case 'Windows_NT':
			return process.env.APPDATA
		case 'Darwin':
			return path.join(os.homedir(), 'Library', 'Application Support')
		default:
			return os.homedir()
	}
}

const appLocalPath = () => (path.join(osAppLocalPath(), appDir()))

const appDataPath = () => (path.join(osAppDataPath(), appDir()))


module.exports = {
	osAppLocalPath,
	osAppDataPath,
	appLocalPath,
	appDataPath,
	appDir
}
