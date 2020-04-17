'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {

    static get deleteTimestamp () {
        return 'deleted_at'
    }

    todoListe(){
        return this.belongsTo('App/Models/TodoListe')
    }
}

module.exports = Task
