import { Context } from "koa";
import taskRepo from '../repos/task.repo'


const getTasks = (ctx: Context) => {
    const username: string = ctx.state.user.username;
    try {
        const tasks = taskRepo.getTasks(username);
        ctx.status = 200;
        ctx.response.body = tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
}

const getCompletedTasks = (ctx: Context) => {
    const username = ctx.state.user.username;
    try {
        const tasks = taskRepo.getCompletedTasks(username);
        ctx.response.body = tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
}

const getIrrelevantTasks = (ctx: Context) => {
    const username = ctx.state.user.username;
    try {
        const tasks = taskRepo.getIrrelevantTasks(username);
        ctx.response.body = tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        ctx.status = 500;
        ctx.body = { error: 'Internal server error' };
    }
}



export = { getTasks, getCompletedTasks, getIrrelevantTasks }