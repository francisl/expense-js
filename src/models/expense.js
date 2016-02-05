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
    
    static create(category, store, date, amount, spenders){
        if (category === undefined || store === undefined || date === undefined || amount === undefined || spenders.length <= 0){
            return false;
        }
        
        const ps = Promise.all([
            Category.getOrCreate(category),
            Store.getOrCreate(store)
        ]);

        ps.then(function(data){
            db.sqlite.serialize(function() {
                
                console.log('data : ', data);
                var newExpSql = `
                    INSERT INTO expense (category_id, store_id, exp_date, amount) 
                    values (${data[0].id}, ${data[1].id}, ${date}, ${amount});
                `;
                console.log('new exp sql : ', newExpSql);
                db.sqlite.run(newExpSql);
                
                db.sqlite.get('select last_insert_rowid();', function(err, data){ 
                    var expId = data['last_insert_rowid()'];
                    spenders.map((s) => {
                        db.sqlite.get(`select id from spender where id = ${s}`, (err, data) => {
                            var sql = `INSERT INTO exp2spender_assoc (exp_id, spender_id) VALUES (${expId}, ${data.id})`;
                            db.sqlite.run(sql);    
                        });      
                    });
                });
            });
        });        
    }
}

module.exports = ExpenseSQL;
