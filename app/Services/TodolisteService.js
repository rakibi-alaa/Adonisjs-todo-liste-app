'use strict'

const Todoliste = use('App/Models/Todoliste')

class TodolisteService {

    // fetch all the todolistes of the current logged in user
    static async userTodoListes(auth){
        const userTodoListes = await auth.user.todolistes().fetch();
        return userTodoListes.toJSON();
    }
    
    // Update a todoliste
    static async update({ params, request }){
        const todoliste = await Todoliste.find(params.id);
        const {title,description,active} = request.all();

        if(todoliste){
            todoliste.title = title;
            todoliste.description = description;
            active ? todoliste.active = (active === '0') : null;
            await todoliste.save();
        }
    }
    
    // Create and store a new todoliste
    static async store({ request ,auth}){
        const {title,description} = request.all();

        const todoliste = new Todoliste();
        todoliste.title = title;
        todoliste.description = description;
        todoliste.active = true;

        try {
            await todoliste.save();
            await todoliste.user().associate(auth.user);
            return 1;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

}

module.exports = TodolisteService
