var modelUtils = require('../models/model-utils');
var config = require('../config');
var db = require('../db');
const configFilename = config.getDbFilename();


function createNewDB(){
	db.createSchemaSql().map((query) => {
		console.log('creating new database.. ', query);
		modelUtils.execSql(query, 'exec');
	});
}


createNewDB();
