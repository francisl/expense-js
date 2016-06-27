import ModelUtils from './model-utils';

class Spender {
    static all() {
        return ModelUtils.execSql('SELECT id, name FROM spender;', 'all');
    }
    
    static getOrCreate(value){
        return ModelUtils.getOrCreate('spender', value);
    }
}

module.exports = Spender;
