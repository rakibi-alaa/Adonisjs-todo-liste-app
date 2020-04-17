'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodoListeSchema extends Schema {
  up () {
    this.create('todo_listes', (table) => {
      table.increments()
      table.string('title')
      table.string('description')
      table.boolean('active')
      table.integer('user_id')
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('todo_listes')
  }
}

module.exports = TodoListeSchema
