import { Knex } from 'knex';

const config: Knex.Config = {
    client: 'pg',
    connection: {
        user: 'joniba',
        host: 'db',
        database: 'todo-list',
        password: 'pass',
        port: 5432,
    }
};

export default config;
``