'use strict'

class TaskStore {
  get rules () {
    return {
      'title': 'required|unique:tasks',
      'description': 'required',
      'scheduled_at' : 'required|date',
      'urgent' : 'required|string'
    }
  }

  get messages() {
    return {
      'required': 'Woah now, {{ field }} is required.',
      'unique': 'Wait a second, this {{ field }} already exists',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }
}

module.exports = TaskStore
