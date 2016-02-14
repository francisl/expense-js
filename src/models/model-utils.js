import db from '../db';

function execSql(sql, mode='get'){
    return new Promise(function(resolve, reject){
        const onResults = function (err, data) {
            if(err) {
                reject(data);
            }
            resolve(data);
        };
        console.log('execSql : ', sql, ' : ', mode );
        switch(mode){
            case 'get':
                db.sqlite.get(sql, onResults);
                break;
            case 'all':
                db.sqlite.all(sql, onResults);
                break;
            case 'run':
                db.sqlite.run(sql, onResults);
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
                   WHERE name = '${name}'`
        db.sqlite.get(sql, onFetch);
    });
}

function create(tablename, name) {
    // console.log('create ', tablename, ' : ', name);
    return execSql(`INSERT INTO ${tablename} (name) VALUES ('${name}')`, 'run');
};
exports.create = create;

function getOrCreate(tablename, name){
    return new Promise((resolve, reject) => {
        get(tablename, name)
        .then((data) => {
            console.log('1 then');
            if (data === undefined) {
                console.log('no data for ', name);
                return create(tablename, name);
            }
            return new Promise((resolve, reject) => {
                console.log('find data for ', name);
                resolve(data);
            });
        }).then((data) => {
            console.log('2 then');
            if(data) {
                console.log('has data from create or get : ', data);
                resolve(data);
            } else {
                console.log('failed to get or create but no error, relaunch');
                resolve(getOrCreate(tablename, name));
            }
        }).catch((err) => {
            // recursive, hope that get will one day return something
            console.log('catch error, relaunch ', err);
            resolve(getOrCreate(tablename, name));
        });
    });
}
exports.getOrCreate = getOrCreate;
