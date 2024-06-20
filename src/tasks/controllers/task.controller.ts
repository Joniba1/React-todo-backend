import { error } from "console";
import { Context } from "koa";
import { Task } from "../../types";
import taskRepo from '../repos/task.repo'
// export const editTask = (ctx: Context) => {
//     const username: string = ctx.state.user.username;
//     const { title, updatedTask } = ctx.request.body as { title: string, updatedTask: Task };
//     try {
//         const existingTask = await editTaskDb(username, title)

//         if (existingTask && existingTask.title != title) {
//             ctx.status = 400;
//             ctx.response.body = { errorCode: 'DUPLICATE_TASKS' }
//             return;
//         }

//         const task: Task = await database('tasks').where({ username: username, title: title }).first();

//         if (!task) {
//             ctx.status = 404;
//             ctx.response.body = { message: 'Task not found' };
//             return;
//         }

//         const response = await database('tasks').where({ username, title })
//             .update(updatedTask);
//         ctx.status = 200;
//         ctx.response.body = response;
//     } catch (error) 
//         ctx.status = 500;
//     ctx.response.body = { message: 'Error updating task', error };

// }

const database = new taskRepo();

export const addTaskController = async (ctx: Context) => {
    const username: string = ctx.state.user.username;
    const { title, description } = ctx.request.body as { title: string, description: string };
    let { deadline } = ctx.request.body as { deadline: string | null };

    if (title === '') {
        ctx.status = 400;
        ctx.response.body = { errorCode: "EMPTY_TITLE" };
        return;
    }
    if (deadline === '') {
        deadline = null;
    }

    try {
        if (await database.getTask(username, title)) {
            ctx.status = 400;
            ctx.response.body = { errorCode: 'DUPLICATE_TASKS' }
            return;
        }

        await database('tasks').insert({ username, title, deadline, description });
        ctx.status = 201;
        ctx.response.body = 'Task added successfully';
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.response.body = 'Error adding task';
    }
}




