'use strict'

const User = use('App/Models/User')

class UserController {
  
  // redirects to the Welcome page
  async home ({ auth, request ,view}) {
  return view.render('welcome')
  }

  // redirects to the login page
  async index ({ view}) {
    return view.render('user/login')
  }

  async show ({ auth,view}) {
    return view.render('/user/profile',{user : auth.user})
  }

  // redirects to the create account page
  async create ({ auth, request ,view}) {
    return view.render('user/register')
  }

  // logs the user in
  async login ({ request, response, auth}) {
      
    const { email, password } = request.all()
    console.log(email + ' ' + password)

    try {
      await auth.attempt(email, password)
      return response.redirect('/')

    } catch (error) {
      console.log(error)
      return response.redirect('/login')
    }
  }

  // register a new user
  async register({ request, response, auth}) {
    try {
      const user = await User.create(request.only(['username','email','password']));

    await auth.login(user);
    return response.redirect('/');
    } catch (error) {
      console.log(error)
      return response.redirect('/signup')
    }
  }

  // register a new user
  async update({ request, response, auth}) {
    const { username,email, password } = request.all()
    try {
      const user = auth.user
      user.username = username;
      user.email = email;

      password ? user.password = password :null


    await user.save();
    return response.redirect('/');
    } catch (error) {
      console.log(error)
      return response.redirect('/profile/edit')
    }
  }

  // logs out the current logged in user
  async logout ({ response, auth}) {
      await auth.logout()
      return response.redirect('/')
  }
}

module.exports = UserController
