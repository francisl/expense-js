// var db = require('../db').sqlite;
import db from '../db';

function execSql(sql, mode='get'){
    return new Promise(function(resolve, reject){
        const onFetch = function (err, data) {
            if (err) throw new Error(err);
            resolve(data);
        };
        console.log('running : ', sql, ' : ', mode );
        switch(mode){
            case 'get':
                console.log('getting ..');
                db.sqlite.get(sql, onFetch);
                break;
            case 'all':
                console.log('alling ..');
                db.sqlite.all(sql, onFetch);
                break;
            case 'run':
                console.log('running ..');
                db.sqlite.run(sql, onFetch);
                break;
            default:
                console.log('defaulting ..');
                db.sqlite.get(sql, onFetch);
        }
    });
}

exports.execSql = execSql;

exports.getOrCreate = function getOrCreate(tablename, name) {
    return new Promise(function(resolve, reject){
        var onFetch = function (err, data) {
            if (err) throw new Error(err);
            if (data === undefined){
                var createPromise = create(tablename, name);
                createPromise.then(function(data){
                    resolve(data);
                });
            } else {
                console.log('getOrCreate resolved : ', data, ' for ', tablename, "|", name);
                resolve(data);
            }
        };
        console.log('getOrCreate ', tablename, ' : ', name);
        var sql = `SELECT id
                   FROM ${tablename}
                   WHERE name = '${name}'`
        db.sqlite.get(sql, onFetch);
    });
};

function create(tablename, name) {
    console.log('create ', tablename, ' : ', name);
    return execSql(`INSERT INTO ${tablename} (name) VALUES ('${name}')`, 'run');
};
exports.create = create;


exports.count = function count(tablename) {
    return execSql(`SELECT count(*) total FROM ${tablename};`);
};
