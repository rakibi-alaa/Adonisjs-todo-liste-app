'use strict'

class TodoListeUpdate {
  
  get rules () {

    console.log('/////////////////////////')
    console.log(this.ctx.request.all())
    console.log('/////////////////////////')
    
    return {
      'title': 'required|unique:todolistes,title,id',
      'description': 'required',
      'active' : 'required|string'
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

module.exports = TodoListeUpdate
