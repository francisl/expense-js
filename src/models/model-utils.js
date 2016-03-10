import db from '../db';

function execSql(sql, mode='get') {
    return new Promise(function(resolve, reject) {
        const onResults = function(err, data) {
            if(err) {
                console.log('reject ::: ', err);
                reject(err);
            }
            resolve(data);
        };

        switch(mode){
            case 'get':
                db.sqlite.get(sql, onResults);
                break;
            case 'all':
                db.sqlite.all(sql, [], onResults);
                break;
            case 'run':
                db.sqlite.run(sql, [], onResults);
                break;
            case 'exec':
                db.sqlite.exec(sql, onResults);
                break;
            default:
                db.sqlite.get(sql, onResults);
        }
    });
}
exports.execSql = execSql;

function count(tablename) {
    return execSql(`SELECT count(*) total FROM ${tablename};`);
};
exports.count = count;

function get(tablename, name, column='id'){
    return new Promise(function(resolve, reject){
        var onFetch = function (err, data) {
            if (err) reject(err);
            resolve(data ? data[column] : undefined);
        };
        var sql = `SELECT ${column}
                   FROM ${tablename}
                   WHERE name = "${name}"`;
        console.log('get sql : ', sql);
        db.sqlite.get(sql, onFetch);
    });
}

function create(tablename, name) {
    // console.log('create ', tablename, ' : ', name);
    var sql = `INSERT INTO ${tablename} (name) VALUES ("${name}")`;
    console.log('create sql : ', sql);
    return execSql(sql, 'run');
};
exports.create = create;

function getOrCreate(tablename, name){
    return new Promise((resolve, reject) => {
        get(tablename, name)
        .then((data) => {
            if (data === undefined) {
                return create(tablename, name);
            }
            return new Promise((resolve, reject) => {
                resolve(data);
            });
        }).then((data) => {
            if(data) {
                resolve(data);
            } else {
                resolve(getOrCreate(tablename, name));
            }
        }).catch((err) => {
            // recursive, hope that get will one day return something
            resolve(getOrCreate(tablename, name));
        });
    });
}
exports.getOrCreate = getOrCreate;
