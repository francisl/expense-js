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
        'INSERT INTO spender (name) values ("test2")'].map((query) => {
        mu.execSql(query, 'exec');
    }));
}

new Promise(function(resolve, reject){

    dropTable().then(() =>{
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
        m.create('Kira', 'Global', '2018-04-04', 888.88, [1, 2])])
    .then(function(){
            mu.execSql('select count(*) from expense;')
            .then(function(data){
                    assert.equal(data, 4);
            });
            mu.execSql('select count(*) from category;')
            .then(function(data){
                    assert.equal(data, 2);
            });
            mu.execSql('select count(*) from store;')
            .then(function(data){
                assert.equal(data, 3);
            });
            mu.execSql('select count(*) from spender;')
            .then(function(data){
                console.log('asserting spender : ', data);
                resolve(assert.equal(data, 3));
                assert.true(false);
            });
            mu.execSql('select count(*) from exp2spender_assoc;')
            .then(function(data){
                    assert.equal(data, 6);
            });
    });
});
