import ModelUtils from './model-utils';

class Store {
    static all() {
        return ModelUtils.execSql('SELECT s.id, s.name, count(e.id) used FROM store s INNER JOIN expense e ON e.store_id = s.id GROUP BY upper(name);', 'all');
    }

    static count() {
        return ModelUtils.count('store');
    }
}


module.exports = Store;
