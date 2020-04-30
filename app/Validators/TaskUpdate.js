'use strict'

class TaskUpdate {
  get rules () {
    const id = this.ctx.params.task_id;
    return {
      'title': `required|unique:tasks,title,id,${id}`,
      'description': 'required',
      'completed': 'required|string',
      'scheduled_at' : 'required|date',
      'urgent' : 'required|string',
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

module.exports = TaskUpdate
