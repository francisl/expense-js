var path = require('path');
var fs = require('fs');
var process = require('process');

const node_env = process.env['NODE_ENV'] || 'default';
const file = path.join(process.env.PWD, 'config', process.env['NODE_ENV'] + '.json');
const configJson = fs.readFileSync(file);
console.log('loading config file');
const configData = JSON.parse(configJson);

module.exports = function config(){
    return configData;
};
