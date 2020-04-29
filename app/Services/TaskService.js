'use strict'

const Task = use('App/Models/Task')
const Todoliste = use('App/Models/Todoliste')

class TaskService {

    // fetch all the Task of a given Todoliste
    static async todoListeTasks(todoliste){
        return await todoliste.tasks().fetch();
    }
    
    // Update a Task
    static async update({ params, request }){
        
    }
    
    // Create and store a new Task
    static async store({ request,params }){
        const {title,description,scheduled_at,urgent} = request.all();

        const task = new Task();
        task.title = title;
        task.description = description;
        task.completed = false
        task.scheduled_at = new Date(scheduled_at+' 00:00:00');
        task.urgent = urgent === '1'; 

        try {
            const todoliste = await Todoliste.find(params.id);
            await todoliste.tasks().save(task);
            return 1;
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

}

module.exports = TaskService
