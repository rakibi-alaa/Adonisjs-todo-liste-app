'use strict'

class TodoListeStore {
  get rules () {
    return {
      'title': 'required|unique:todolistes',
      'description': 'required',
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

module.exports = TodoListeStore
