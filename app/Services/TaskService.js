'use strict'

const Task = use('App/Models/Task')
const Todoliste = use('App/Models/Todoliste')

class TaskService {

    // fetch all the Task of a given Todoliste
    static async todoListeTasks(todoliste){
        return await todoliste.tasks().fetch();
    }
    // fetch a task as query builder or json depending on the @json param
    static async getTask(task_id,json){
        if(json){
            const task = await Task.find(task_id);
            return task.toJSON();
        }else{
            return await Task.find(task_id);
        }
        
    }
    
    // Update a Task
    static async update({ params, request }){
        const task = await this.getTask(params.task_id,false)
        const {title,description,completed,urgent,scheduled_at} = request.all();
        
        if(task){
            try {
                task.title = title;
                task.description = description;
                task.completed = (completed === '1') ;
                task.urgent = (urgent === '1') ;
                task.scheduled_at = new Date(scheduled_at+' 00:00:00');

                await task.save();
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
            
        }
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
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async destroy({ params }){
        const task = await this.getTask(params.task_id,false);
        try {
            await task.delete();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

}

module.exports = TaskService
