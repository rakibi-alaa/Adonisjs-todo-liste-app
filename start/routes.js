'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'UserController.home')
Route.get('/login', 'UserController.index')
Route.post('/login', 'UserController.login').as('users.login')
Route.get('/signup', 'UserController.create')
Route.post('/signup', 'UserController.register').validator('UserStore');
Route.get('/logout', 'UserController.logout')

