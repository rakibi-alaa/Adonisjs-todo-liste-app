'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TodoListe extends Model {
    
    static get deleteTimestamp () {
        return 'deleted_at'
    }

    user(){
        return this.belongsTo('App/Models/User')
    }

    tasks(){
        return this.hasMany('App/Models/Taks')
    }

}

module.exports = TodoListe
