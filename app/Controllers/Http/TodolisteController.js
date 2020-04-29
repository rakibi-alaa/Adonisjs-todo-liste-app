'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Todoliste = use('App/Models/Todoliste')
const TodolisteService = use('App/Services/TodolisteService')
const TaskService = use('App/Services/TaskService')

/**
 * Resourceful controller for interacting with todolistes
 */
class TodolisteController {
  /**
   * Show a list of all todolistes.
   * GET todolistes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ view ,auth}) {
    return view.render('/todoliste/index',{todolistes : await TodolisteService.userTodoListes(auth)})
  }

  /**
   * Render a form to be used for creating a new todoliste.
   * GET todoliste/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('/todoliste/create')
  }

  /**
   * Create/save a new todoliste.
   * POST todoliste
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store (ctx) {
    const response = await TodolisteService.store(ctx);
    if(response) return ctx.response.redirect('/todoliste'); 
    return ctx.response.redirect('back'); 
  }

  /**
   * Display a single todoliste.
   * GET todoliste/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response, view }) {
    const todoliste = await Todoliste.find(params.id)
    if(todoliste){
      const tasks = await TaskService.todoListeTasks(todoliste);
      console.log('tasks.toJSON()')
      console.log(tasks.toJSON())
      return view.render('todoliste/show',{
        todoliste : todoliste.toJSON(),
        tasks : tasks.toJSON()
      })
    }
    return response.status(401).send();
  }

  /**
   * Render a form to update an existing todoliste.
   * GET todoliste/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, view }) {
    const todoliste = await Todoliste.find(params.id);
   return view.render('/todoliste/edit',{todoliste : todoliste.toJSON()})
  }

  /**
   * Update todoliste details.
   * PUT or PATCH todoliste/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update (ctx) {
    await TodolisteService.update(ctx);
    return ctx.response.redirect('/todoliste')
  }

  /**
   * Delete a todoliste with id.
   * DELETE todoliste/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response }) {
    const todoliste = await Todoliste.find(params.id);
    await todoliste.delete()
    return response.redirect('back');
  }
}

module.exports = TodolisteController
