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

function get(tablename, name){
    return new Promise(function(resolve, reject){
        var onFetch = function (err, data) {
            if (err) throw new Error(err);
            console.log('getOrCreate resolved : ', data, ' for ', tablename, "|", name);
            const value = data ? data.id : undefined;
            resolve(value);
        };
        console.log('getOrCreate ', tablename, ' : ', name);
        var sql = `SELECT id
                   FROM ${tablename}
                   WHERE name = '${name}'`
        db.sqlite.get(sql, onFetch);
    });
}

exports.getOrCreate = function getOrCreate(tablename, name) {
    return new Promise((resolve, reject)=>{
        var onComplete = (data) => {
            console.log('getOrCreate returns : ', data);
            resolve(data);
        }
        
        const getPromise = get(tablename, name);
        getPromise.then((data) => {
            console.log('get or create get result :', data);
            if (data === undefined) {
                var createPromise = create(tablename, name);
                createPromise.then(function(data){
                    console.log('create on comlete ', data);
                    onComplete(data);
                });
            } else {
                onComplete(data);
            }   
        });
    });
    
    
};

function create(tablename, name) {
    console.log('create ', tablename, ' : ', name);
    return new Promise((resolve, reject) => {
       var onFetch = function (err, data) {
            if (err) throw new Error(err);
            console.log('create resolved : ', data, ' for ', tablename, "|", name);
            resolve(data);
        };
        
        var createPromise = execSql(`INSERT INTO ${tablename} (name) VALUES ('${name}')`, 'run');
        createPromise.then((data)=>{
            db.sqlite.get('select last_insert_rowid();', function(err, data){
               onFetch(err, data['last_insert_rowid()']); 
            });
        })   
        
    });
    
};
exports.create = create;


exports.count = function count(tablename) {
    return execSql(`SELECT count(*) total FROM ${tablename};`);
};
