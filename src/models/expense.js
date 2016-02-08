import db from '../db';
import ModelUtils from './model-utils';
import Category from '../models/category-model';
import Spender from '../models/spender';
import Store from '../models/store-model';


var DateRange = function(year, month) {
    var startDate = `${year}-${month}-01`;
    var endDate = `${year}-${month}-31`;
    return {
        start: startDate,
        end: endDate
    };
};

class ExpenseSQL {
    static all() {
        var sql = `
            SELECT e.*,
                   store.name store,
                   c.name category,
                   GROUP_CONCAT(s.name) spenders,
                   count(e.id) sum
            FROM exp2spender_assoc ass
            INNER JOIN expense e ON e.id = ass.exp_id
            INNER JOIN spender s ON s.id = ass.spender_id
            INNER JOIN category c ON c.id = e.category_id
            INNER JOIN store ON store.id = e.store_id
            GROUP BY e.id
            ORDER BY e.exp_date`;
        return ModelUtils.execSql(sql, 'all');
    }

    static byDate(year, month, spenderId){
        var rdate = DateRange(year, month);
        var sql =`
            SELECT e.exp_date,
                        ROUND(e.amount, 2) amount,
                        store.name store,
                        c.name category,
                        ROUND(e.amount / (select count(*) from exp2spender_assoc ass WHERE ass.exp_id = e.id), 2) sum
            FROM expense e
            LEFT JOIN exp2spender_assoc ass ON ass.exp_id = e.id
            LEFT JOIN spender s ON ass.spender_id = s.id
            INNER JOIN category c ON c.id = e.category_id
            INNER JOIN store ON store.id = e.store_id
            WHERE e.exp_date BETWEEN '${rdate.start}' AND '${rdate.end}'
            AND s.id = ${spenderId}
            GROUP BY e.id
            ORDER BY c.name, store.name, e.exp_date`;
        return ModelUtils.execSql(sql, 'all');
    }

    static sum(year, month, spenderId) {
        var sql;
        typeof year !== 'undefined' ? console.log('true') : console.log('false');
        if (typeof year !== 'undefined' && typeof month !== 'undefined') {
            var rdate = DateRange(year, month);
            sql = `
                SELECT ROUND(SUM(amount / (select count(*) from exp2spender_assoc ass WHERE ass.exp_id = eid) ), 2) sum,
                            ROUND(SUM (amount), 2) total
                FROM (SELECT e.amount amount, e.id eid
                            FROM expense e
                            LEFT JOIN exp2spender_assoc ass ON ass.exp_id = e.id
                            LEFT JOIN spender s ON ass.spender_id = s.id
                            WHERE e.exp_date BETWEEN '${rdate.start}' AND '${rdate.end}'
                            AND s.id = ${spenderId});`;
        } else {
            sql = 'SELECT ROUND(SUM(amount), 2) sum, ROUND(SUM(amount), 2) total  FROM expense;';
        }
        return ModelUtils.execSql(sql, 'get');
    }

    static years(){
        return new Promise(function(resolve, reject){
            var onFetch = function (err, data) {
                if (err) throw new Error(err);
                console.log('resolved years');
                var loggedYears = {}
                _.each(data, (year) => {
                    loggedYears[year.exp_date.split('-')[0]] = null;
                })
                resolve(_.keys(loggedYears));
            };

            console.log('promise years');
            db.sqlite.all('SELECT exp_date FROM expense GROUP BY exp_date;', onFetch);
        });
    }

    static insertSpenders (categoryId, storeId, date, amount, spenders){
        return new Promise((resolve, reject) => {
            ExpenseSQL.getExistingExpense(categoryId, storeId, date, amount)
            .then((expense) => {
                spenders.map((s) => {
                    db.sqlite.get(`select id from spender where id = ${s}`, (err, data) => {
                        db.sqlite.run(`INSERT INTO exp2spender_assoc (exp_id, spender_id) VALUES (${expense.id}, ${data.id})`);
                    });
                });
                resolve(expense.id)
            }).catch((err) => {
                reject(err);
            });
        });
    }

    static getExistingExpense(categoryId, storeId, date, amount){
        var getSql = `
            SELECT id
            FROM expense
            WHERE category_id = '${categoryId}'
            AND store_id = '${storeId}'
            AND amount = '${amount}'
            AND exp_date = '${date}';
        `;
        return ModelUtils.execSql(getSql, 'get');
    }

    static insertExpense(categoryId, storeId, date, amount, spenders){
        return new Promise((resolve, reject) => {
            ExpenseSQL.getExistingExpense(categoryId, storeId, date, amount)
            .then((data) => {
                if (data === undefined){
                    var newExpSql = 'INSERT INTO expense (category_id, store_id, exp_date, amount) values (?, ?, ?, ?);';
                    db.sqlite.run(newExpSql, [categoryId, storeId, date, amount], (err) => {
                        ExpenseSQL.insertSpenders(categoryId, storeId, date, amount, spenders)
                        .then((expenseId) => { resolve(expenseId) })
                        .catch((err) => { reject(err)});
                    });
                } else {
                    reject("Already Exist : ", data);
                }
            });
        });
    }

    static create(category, store, date, amount, spenders){
        if (category === undefined || store === undefined || date === undefined || amount === undefined || spenders.length <= 0){
            return false;
        }
        return new Promise((resolve, reject) => {
            Promise.all([
                Category.getOrCreate(category),
                Store.getOrCreate(store)
            ]).then((data) => {
                ExpenseSQL.insertExpense(
                    data[0],
                    data[1],
                    date,
                    amount,
                    spenders
                ).then((expenseId) => {
                    resolve(expenseId);
                }).catch((err) => {
                    console.log('error with insertExpense ', err);
                    reject(err);
                })
            });
        });
    }
}

module.exports = ExpenseSQL;
