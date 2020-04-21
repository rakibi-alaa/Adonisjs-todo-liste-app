'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Todoliste extends Model {
    
    static get deleteTimestamp () {
        return 'deleted_at'
    }
    static castDates (field, value) {
       
        return value.calendar()
       
    }

    user(){
        return this.belongsTo('App/Models/User')
    }

    tasks(){
        return this.hasMany('App/Models/Taks')
    }

}

module.exports = Todoliste
