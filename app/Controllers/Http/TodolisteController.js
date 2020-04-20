'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Todoliste = use('App/Models/Todoliste')

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
  async index ({ request, response, view }) {
    return view.render('/todoliste/index')
  }

  /**
   * Render a form to be used for creating a new todoliste.
   * GET todolistes/create
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
   * POST todolistes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response ,auth}) {

    const {title,description} = request.all();

    const todoliste = new Todoliste();
    todoliste.title = title;
    todoliste.description = description;
    todoliste.active = true;
    
    try {
      await todoliste.save();
      await todoliste.user().associate(auth.user);
      return response.redirect('/todoliste');
    } catch (error) {
      console.log(error)
      return view.render('/todoliste/create')
    }
    
  }

  /**
   * Display a single todoliste.
   * GET todolistes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing todoliste.
   * GET todolistes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update todoliste details.
   * PUT or PATCH todolistes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a todoliste with id.
   * DELETE todolistes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TodolisteController