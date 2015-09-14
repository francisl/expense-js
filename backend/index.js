var express = require('express');
var ExpenseSQL = require('./models/expense');
var Spender = require('./models/spender');
var Category = require('./models/category-model');
var Store = require('./models/store-model');
var stores = require('./views/stores');
var categories = require('./views/categories');
var _ = require('lodash');

var app = express();
var MONTHS = [
    {id: '01', month: 'January'},
    {id: '02', month: 'February'},
    {id: '03', month: 'March'},
    {id: '04', month: 'April'},
    {id: '05', month: 'May'},
    {id: '06', month: 'June'},
    {id: '07', month: 'July'},
    {id: '08', month: 'August'},
    {id: '09', month: 'September'},
    {id: '10', month: 'October'},
    {id: '11', month: 'November'},
    {id: '12', month: 'December'}
];

app.set('view engine', 'jade');

class LastMonthDate {
    static getYearMonth () {
        let d = new Date(),
              year = d.getFullYear(),
              month = d.getMonth()+1;
        // select previous month
        if (month === 1){
            return [year--, 12];
        } else {
            return [year, month--];
        }
    }
}

class ExpenseRenderer {
    static renderData (data) {
        // set forms values
        var [year, month] = data.selectedYearMonth || LastMonthDate.getYearMonth();

        console.log('total : ', data.sum);
        return {
            expenses: data.expenses ,
            spenders: data.spenders,
            total: data.sum.total,
            sum: data.sum.sum,
            years: data.years,
            currentYear: year,
            months: _.each(MONTHS, (x) => {
                x.checked = parseInt(x.id) === parseInt(month) ? true : false;
                return x;
            })
        };
    }
}

app.get('/', function (req, res) {
    var ps = null,
         [year, month] = LastMonthDate.getYearMonth();

    ps = Promise.all([
        Spender.all(),
        Category.all(),
        Store.all()
    ]);

    ps.then(function(data){
        res.render('templates/index',
                        {
                            currentYear: year,
                            years: [year-1, year],
                            months: _.each(MONTHS, (x) => {
                                x.checked = parseInt(x.id) === parseInt(month) ? true : false;
                                return x;
                            }),
                            spenders: data[0],
                            categories: data[1],
                            stores: data[2]

                        }
        );
    });
});


app.get('/report', function (req, res) {
    var ps = null,
         selectedYearMonth =  [];

    if (req.query.year && req.query.month && req.query.spender){
        ps = Promise.all([
            ExpenseSQL.byDate(req.query.year, req.query.month, req.query.spender),
            Spender.all(),
            ExpenseSQL.sum(req.query.year, req.query.month, req.query.spender),
            ExpenseSQL.years()
        ]);
        selectedYearMonth =  [req.query.year, req.query.month];
    } else {
        ps = Promise.all([
            ExpenseSQL.all(),
            Spender.all(),
            ExpenseSQL.sum(),
            ExpenseSQL.years()
       ]);
    }

    ps.then(function(data){
        res.render('templates/report',
                         ExpenseRenderer.renderData(
                             {
                                expenses: data[0],
                                spenders: data[1],
                                sum: data[2],
                                years: data[3],
                                selectedYearMonth: selectedYearMonth
                            })
        );
    });
});

app.use('/stores', stores);
app.use('/categories', categories);
app.use("/style", express.static('style'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
