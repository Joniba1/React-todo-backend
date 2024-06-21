export type User = {
    username: string;
    password: string;
};

export type Task = {
    username: string;
    title: string;
    description: string;
    completed: boolean;
    relevance: boolean;
    deadline: string | null;
};

export type Day = {
    day: number;
    tasksInDayCount: number;
}