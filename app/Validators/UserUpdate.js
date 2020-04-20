'use strict'

class UserUpdate {
  get rules () {
    return {
      'username': 'required',
      'email': 'required|email',
      'password': 'confirmed',
      'password_confirmation': 'required_if:password',
    }
  }

  get messages() {
    return {
      'required': 'Woah now, {{ field }} is required.',
      'unique': 'Wait a second, the {{ field }} already exists',
      'confirmed' : 'Wait a second, the {{ field }} doesnt match the password_confirmation'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }
}

module.exports = UserUpdate
