'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {

    static boot () {
        super.boot()
    
        this.addTrait('@provider:Lucid/SoftDeletes')
    }
    static get dates () {
        return super.dates.concat(['scheduled_at'])
    }

    static castDates (field, value) {
        return value.calendar();
    }

    todoListe(){
        return this.belongsTo('App/Models/TodoListe')
    }
}

module.exports = Task
