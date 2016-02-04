// var db = require('../db').sqlite;
import db from '../db';

function execSql(sql, mode='get'){
    return new Promise(function(resolve, reject){
        const onFetch = function (err, data) {
            if (err) throw new Error(err);
            resolve(data);
        };
        console.log('running : ', sql  );
        switch(mode){
            case 'get':
                db.sqlite.get(sql, onFetch);
                break;
            case 'all':
                db.sqlite.all(sql, onFetch);
                break;
            default:
                db.sqlite.get(sql, onFetch);
        }

    });
}

exports.execSql = execSql;

exports.getOrCreate = function getOrCreate(tablename, name) {
    return new Promise(function(resolve, reject){
        var onFetch = function (err, data) {
            if (err) throw new Error(err);
            console.log('resolved getorcreate category ', data);
            if (data === undefined){
                console.log('asking create');
                var createPromise = create(tablename, name);
                createPromise.then(function(data){
                    resolve(data);
                });
            } else {
                console.log('can resolve ', data);
                resolve(data);
            }
        };
        var sql = `SELECT id
                   FROM ${tablename}
                   WHERE name = '${name}'`
        db.sqlite.get(sql, onFetch);
    });
};

exports.create = function create(tablename, name) {
    return execSql(`INSERT INTO ${tablename} (name) VALUES ('${name}')`);
};

exports.count = function count(tablename) {
    return execSql(`SELECT count(*) total FROM ${tablename};`);
};
