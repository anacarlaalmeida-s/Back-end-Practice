const knex = require("knex")({
    client: "pg",
    connection: {
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl:{
        rejectUnauthorized: false
      }
    },
  });
  
  module.exports = knex;
  