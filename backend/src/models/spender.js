import ModelUtils from './model-utils';

class Spender {
    static all() {
        return ModelUtils.execSql('SELECT id, name FROM spender;', 'all');
    }
}

module.exports = Spender;
