import db from '../db';
import ModelUtils from './model-utils';

console.log('base model : ', ModelUtils);

class Category {
    static all() {
        return ModelUtils.execSql(`SELECT c.id, c.name, count(e.id) used
                   FROM category c
                   INNER JOIN expense e
                   ON e.category_id = c.id
                   GROUP BY upper(name)`, 'all');
    }

    static count() {
        return ModelUtils.count('category');
    }

    static where(idList){
        return ModelUtils.execSql(`SELECT c.id, c.name, count(e.id) used
                   FROM category c
                   INNER JOIN expense e
                   ON e.category_id = c.id
                   GROUP BY upper(name)
                   WHERE c.id in '${idList}'
                   ORDER BY used`, 'all');
    }
}

module.exports = Category;
