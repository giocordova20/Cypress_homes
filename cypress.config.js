const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

async function setupNodeEvents(on, config) {
  
  config.db = {
    userName: "giocordova",
    password: "Gio!Udemy",
    server: "gcoudemeyserver.database.windows.net",
    options: {
      database: 'udemydb',
      encrypt: true,
      rowCollectionOnRequestCompletion : true
    }
  }
  // implement node event listeners here
  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  //task for fs
  on('task',{
    excelToJsonConverter(filePath)
    {
      const result = excelToJson({
        source: fs.readFileSync(filePath) // fs.readFileSync return a Buffer ***NEEDS TO BE IN A task
    });
    return result;
    }
  })
  
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));


  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  defaultCommandTimeout: 6000, // Global Command TimeOut

  env: {
    url : "https://rahulshettyacademy.com",
    // url : "https://google.com",
    userId: "giocordova",
    password: "password123",
    homes: "https://www.homes.com/"
  },

  retries: {
    runMode: 0,
    },

  projectId: "9hbtfr",

  e2e: {
    
    setupNodeEvents,
    // specPattern: 'cypress/integration/examples/BDD/*.feature',
    specPattern:'cypress/integration/examples/*.js', 
    // baseUrl: 'https://www.homes.com/',
    // "chromeWebSecurity": false
  }


});
