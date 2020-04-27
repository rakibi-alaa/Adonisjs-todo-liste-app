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
Route.get('/profile', 'UserController.show').middleware(['auth'])
Route.post('/profile/edit', 'UserController.update').as('users.editprofile').validator('UserUpdate');

Route.group(() => {
    Route.get('/', 'TodolisteController.index')
    Route.get('/create', 'TodolisteController.create').as('todolistes.create')
    Route.post('/create', 'TodolisteController.store').as('todolistes.store').validator('TodoListeStore');
    Route.get('/:id', 'TodolisteController.show').as('todoliste.show');
    Route.get('/:id/edit', 'TodolisteController.edit').as('todolistes.edit')
    Route.post('/:id/edit', 'TodolisteController.update').as('todolistes.update').validator('TodoListeUpdate');
}).prefix('todoliste').middleware(['auth'])

