var db = require('../db').sqlite;
var _ = require('lodash');

var DateRange = function(year, month) {
    var startDate = `${year}-${month}-01`;
    var endDate = `${year}-${month}-31`;
    return {
        start: startDate,
        end: endDate
    };
};

var ExpenseSQL = {
    all: function() {
        return new Promise(function(resolve, reject){
            console.log('promise expense');
            var onFetch = function (err, data) {
                if (err) throw new Error(err);
                console.log('resolved all');
                resolve(data);
            };
            db.all(`
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
                ORDER BY e.exp_date`,
                onFetch);
        });
    },

    byDate: function(year, month, spenderId){
        return new Promise(function(resolve, reject){
            console.log(`promise expense by month : ${year} - ${month}`);
            var onFetch = function (err, data) {
                if (err) throw new Error(err);
                console.log('resolved byDate');
                resolve(data);
            };
            var rdate = DateRange(year, month);
            console.log('got rdate : ', rdate);
            console.log('spenderid');
            db.all(`
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
                ORDER BY c.name, store.name, e.exp_date`,
                onFetch);
            });
    },

    sum: function(year, month, spenderId) {
        return new Promise(function(resolve, reject){
            var onFetch = function (err, data) {
                if (err) throw new Error(err);
                console.log('resolved sum');
                resolve(data);
            };
            console.log('promise sum');
            typeof year !== 'undefined' ? console.log('true') : console.log('false');
            if (typeof year !== 'undefined' && typeof month !== 'undefined') {
                var rdate = DateRange(year, month);
                db.get(`
                    SELECT ROUND(SUM(amount / (select count(*) from exp2spender_assoc ass WHERE ass.exp_id = eid) ), 2) sum,
                                ROUND(SUM (amount), 2) total
                    FROM (SELECT e.amount amount, e.id eid
                                FROM expense e
                                LEFT JOIN exp2spender_assoc ass ON ass.exp_id = e.id
                                LEFT JOIN spender s ON ass.spender_id = s.id
                                WHERE e.exp_date BETWEEN '${rdate.start}' AND '${rdate.end}'
                                AND s.id = ${spenderId});
                `, onFetch);
            } else {
                db.get('SELECT ROUND(SUM(amount), 2) sum, ROUND(SUM(amount), 2) total  FROM expense;', onFetch);
            }

        });
    },

    years: function(){
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
            db.all('SELECT exp_date FROM expense GROUP BY exp_date;', onFetch);
        });
    }
};

module.exports = ExpenseSQL;
