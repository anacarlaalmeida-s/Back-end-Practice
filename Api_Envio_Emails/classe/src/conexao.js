const knex = require("knex")({
  client: "pg",
  connection: {
    user: "****",
    database: "newsletter",
    host: "localhost",
    password: "****",
    port: 5432,
   
  },
});

module.exports = knex;
