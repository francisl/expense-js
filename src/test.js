var db = require('./db');
var m = require('./models/expense');
var mu = require('./models/model-utils');
var assert = require('chai').assert;

var sqlite = db.sqlite;

function dropTable() {
    return Promise.all(db.dropSchemaSql().map((query)=>{
        return mu.execSql(query, 'exec');
    }));
}

function createTable() {
    return Promise.all(db.createSchemaSql().map((query) => {
        mu.execSql(query, 'exec');
    }));
}

function createTestSpenders() {
    return Promise.all([
        'INSERT INTO spender (name) values ("test1")',
        'INSERT INTO spender (name) values ("test2")',
        'INSERT INTO spender (name) values ("test3")'].map((query) => {
        mu.execSql(query, 'exec');
    }));
}

function thenSuccess(name) {
    return function(data){
        console.log('SUCCESS :: ', name);
    };
}

function catchError(name) {
    return function(err){
        console.log('ERROR !!!=====> ', name, ' >> ', err.message);
    };
}

function assertSqlEqual(sql, equal, name) {
    mu.execSql(sql)
    .then(function(data){
            assert.equal(data['count(*)'], equal);
    }).then(thenSuccess(name)).catch(catchError(name));
}

Promise((resolve, reject) => {
    dropTable().then(() => {
        console.log('=====>>> creating Schema');
        createTable().then(() => {
            console.log('=====>>> Schema completed');
        }).then(() => {
            createTestSpenders().then(() => resolve());
        });
    });
})
.then(function(){
    console.log('=====>>> Start creating expenses');
    Promise.all([
        m.create('Epicerie', 'Provigo', '2018-01-01', 444.44, [1]),
        m.create('Epicerie', 'Provigo', '2018-01-02', 555.55, [1, 2]),
        m.create('Epicerie', 'IGA', '2018-02-02', 666.66, [1]),
        m.create('Kira', 'Global', '2018-04-04', 888.88, [1, 2]),
        m.create('Maison', 'Canadian Tire', '2018-04-04', 999.88, [1, 2, 3]),
        m.create('Auto', 'Canadian Tire', '2018-04-04', 4000.88, [1]),
        m.create('Auto', 'Canadian Tire', '2018-04-04', 6000.88, [1])])
    .then(function(){
        assertSqlEqual('select count(*) from expense;', 7, 'Expense');
        assertSqlEqual('select count(*) from category;', 4, 'Category');
        assertSqlEqual('select count(*) from store;', 4, 'Store');
        assertSqlEqual('select count(*) from spender;', 3, 'Spender');
        assertSqlEqual('select count(*) from exp2spender_assoc;', 11, 'exp2spender_assoc');
    });
});
