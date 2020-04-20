'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodolistesSchema extends Schema {
  up () {
    this.create('todolistes', (table) => {
      table.increments()
      table.string('title')
      table.string('description')
      table.boolean('active')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
      table.timestamp('deleted_at')
    })
  }

  down () {
    this.drop('todolistes')
  }
}

module.exports = TodolistesSchema
