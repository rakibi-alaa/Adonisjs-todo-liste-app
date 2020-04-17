'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.string('title')
      table.string('description')
      table.boolean('completed')
      table.datetime('scheduled_at')
      table.integer('todoliste_id')
      table.boolean('urgent')
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
