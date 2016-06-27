var express = require('express');
var ExpenseSQL = require('./models/expense');
var Spender = require('./models/spender');
var Category = require('./models/category-model');
var Store = require('./models/store-model');
var stores = require('./views/stores');
var categories = require('./views/categories');
var _ = require('lodash');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json())

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

        data.months = _.each(MONTHS, (x) => {
            x.checked = parseInt(x.id) === parseInt(month) ? true : false;
            return x;
        });
        data.currentYear = year;
        data.total = data.sum.total;
        data.sum = data.sum.sum;
        return data;
    }
}

function report(req, res) {
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
                    {   expenses: data[0],
                        spenders: data[1],
                        sum: data[2],
                        years: data[3],
                        selectedYearMonth: selectedYearMonth,
                        selectedSpender: req.query.spender
                    })
        );
    });
}

var appDir = __dirname + '/../../app/dist';
app.get('/', express.static(appDir));
app.use('/app', express.static(appDir));

app.get('/report', report);
app.use('/stores', stores);
app.use('/categories', categories);

var styleDir = __dirname + '/../vendor';
app.use('/style', express.static(styleDir));


require('./api/categories')(app);
require('./api/invoices')(app);
require('./api/spenders')(app);
require('./api/stores')(app);


var server = app.listen(5000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
    console.log('Static dir : ', styleDir);
	console.log('App dir : ', appDir);
});
