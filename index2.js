var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./auth.db"
  }
});

console.log(knex);

console.log('hello')