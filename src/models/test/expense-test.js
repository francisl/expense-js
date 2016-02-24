import sinon from 'sinon';
import chai from 'chai';
import {expect, assert} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import db from '../../db';
modelUtils.execSql(db.createSchemaSql(), 'run');
import modelUtils from '../model-utils';
import expense from '../expense';


chai.use(chaiAsPromised);


describe('create', function() {
    beforeEach(function() {
        modelUtils.execSql(db.createSchemaSql(), 'run');
    });

    it("should return false if bad number of parameters", function (done) {
        expect(expense.create('TestCat', 'TestStore', '2015-01-01', '232.32')).to.be.false;
        expect(expense.create('TestCat', 'TestStore', '2015-01-01')).to.be.false;
        expect(expense.create('TestCat', 'TestStore')).to.be.false;
        expect(expense.create('TestCat')).to.be.false;
        expect(expense.create()).to.be.false;
        done();
    });

    it("should insert expense when all information are there", function (done) {
        this.timeout(5000);
        const pcount = modelUtils.execSql('select count(*) from expense;');
        debugger;
        pcount.then(function(d){console.log('then2 : ', d)}).catch(function(e){console.log('error2 : ', e)});
        return expect(pcount).to.eventually.equal("foo");
    });

    // it("should resolve when all information are there", function (done) {
    //     this.timeout(5000);
    //     var modelUtilsMock = sinon.mock(modelUtils);
    //     modelUtilsMock.expects("getOrCreate").twice().returns(1);
    //     assert.isFulfilled(expense.create('TestCat', 'TestStore', '2015-01-01', '232.32', [1]));
    //     expect(expense.create('TestCat', 'TestStore', '2015-01-01', '232.32', [1])).to.eventually.fulfilled;
    // });

});
