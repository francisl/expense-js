// // import expense from '../expense';
//
// describe('create', function() {
//     it('should return a promise', function() {
//
//         assert.equal(expense.create('TestCat', 'TestStore', '2015-01-01', '232.32', [1]), 3);
//     });
// });


import test from 'ava';
// import 'babel-core/register';
import expense from '../expense';
import createSchemaSql from '../../db';

test('create Should return false if any value is missing', t => {
    t.false(expense.create('TestCat', 'TestStore', '2015-01-01'));
    t.false(expense.create('TestCat', 'TestStore', '2015-01-01', 232.23));
});

test('create Should return a promise while it get or create the category and store', t => {
    var p = expense.create('TestCat', 'TestStore', '2015-01-01', 234.23, [1])
    t.doesNotThrow(p);
});
