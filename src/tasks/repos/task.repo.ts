import Knex from "knex";
import { Task } from "../../types";
import knexConfig from '../../database/knexfile';

const database = Knex(knexConfig);

interface TaskRepo {
    getTask: (username: string, title: string) => Promise<Task | undefined>;
    getTasks: (username: string) => Promise<Task[]>;
    getCompletedTasks: (username: string) => Promise<Task[]>;
    getIrrelevantTasks: (username: string) => Promise<Task[]>;

    addTask: (task: Task) => void;
    deleteTask: (task: Task) => void;
    editTask: (task: Task) => void;

    setCompletion: (task: Task) => void;
    setRelevance: (task: Task) => void;
}

export const taskRepo: TaskRepo = {
    getTask: (username: string, title: string) => getTask(username, title),
    getTasks: (username: string) => getTasks(username),
    getCompletedTasks: (username: string) => getCompletedTasks(username),
    getIrrelevantTasks: (username: string) => getIrrelevantTasks(username),

    addTask: (task: Task) => addTask(task),
    deleteTask: (task: Task) => deleteTask(task),
    editTask: (task: Task) => editTask(task),

    setCompletion: (task: Task) => setCompletion(task),
    setRelevance: (task: Task) => setRelevance(task),
}

const getTask = async (username: string, title: string): Promise<Task | undefined> => {
    const existingTask: Task | undefined = await database('tasks').where({ username, title }).first();
    return existingTask ? existingTask : undefined;
}

const getTasks = async (username: string) => {
    return await database('tasks').where({ username }).select('*');
}
const getCompletedTasks = async (username: string) => await database('tasks').where({ username, completed: true }).select('*');

const getIrrelevantTasks = async (username: string) => await database('tasks').where({ username, relevance: false }).select('*');

const addTask = async (task: Task) => await database('tasks').insert(task);

const deleteTask = async (task: Task) => await database('tasks').where({ username: task.username, title: task.title }).del();

const editTask = async (task: Task) => await database('tasks').where({ username: task.username, title: task.title }).first();

const setCompletion = async (task: Task) => await database('tasks').where({ username: task.username, title: task.title }).update({ completed: !task.completed });

const setRelevance = async (task: Task) => await database('tasks').where({ username: task.username, title: task.title }).update({ relevance: !task.relevance });

export default taskRepo;