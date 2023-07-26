const { defineConfig } = require("cypress");

const { Pool } = require('pg')

const dbConfig = {
  host: 'silly.db.elephantsql.com',
  user: 'kxmjossu',
  password: 'uy6IL9urpgeaefO3nFtvBAUezcOd0uOZ',
  database: 'kxmjossu',
  port: 5432
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on('task', {

        deleteStudent(studentEmail) {
          return new Promise(function (resolve, reject) {
            const pool = new Pool(dbConfig)

            const query = 'DELETE FROM students WHERE email = $1;'

            pool.query(query, [studentEmail], function (error, result) {
              if (error) {
                reject({error: error})
              }
              resolve({sucess: result})
              pool.end()
            })
          })


        }

      })
    },
  },
});
