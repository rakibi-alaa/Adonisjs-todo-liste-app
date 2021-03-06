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
    Route.put('/:id/edit', 'TodolisteController.update').as('todolistes.update').validator('TodoListeUpdate');
    Route.get('/:id/delete','TodolisteController.destroy').as('todoliste.destroy')
    
}).prefix('todoliste').middleware(['auth'])

Route.group(() => {
    Route.get('/create', 'TaskController.create').as('task.create')
    Route.post('/create', 'TaskController.store').as('task.store').validator('TaskStore');
    Route.get('/:task_id?/edit', 'TaskController.edit').as('task.edit')
    Route.put('/:task_id?/edit', 'TaskController.update').as('task.update').validator('TaskUpdate');
    Route.get('/:task_id?/delete','TaskController.destroy').as('task.destroy');
}).prefix('todoliste/:id?/tasks').middleware(['auth'])