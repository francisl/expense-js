import db from '../db';

function execSql(sql, mode='get'){
    return new Promise(function(resolve, reject){
        const onFetch = function (err, data) {
            // if (err) throw new Error(err);
            if(err){
                reject(data);
            }
            resolve(data);
        };
        console.log('execSql : ', sql, ' : ', mode );
        switch(mode){
            case 'get':
                db.sqlite.get(sql, onFetch);
                break;
            case 'all':
                db.sqlite.all(sql, onFetch);
                break;
            case 'run':
                db.sqlite.run(sql, onFetch);
                break;
            default:
                db.sqlite.get(sql, onFetch);
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
            if (err) throw new Error(err);
            const value = data ? data[column] : undefined;
            resolve(value);
        };
        var sql = `SELECT ${column}
                   FROM ${tablename}
                   WHERE name = '${name}'`
        db.sqlite.get(sql, onFetch);
    });
}

function create(tablename, name) {
    console.log('create ', tablename, ' : ', name);
    return execSql(`INSERT INTO ${tablename} (name) VALUES ('${name}')`, 'run');
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
