const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
 
  plugins: [
    {
      "reporter": "mochawesome",
      "reporterOptions": {
        "reportDir": "cypress/report/mochawesome-report",
        "overwrite": true,
        "html": true,
        "json": false,
        "timestamp": "mmddyyyy_HHMMss",
        "charts": true,
        "code": true,
        "reportTitle": "Testes Api Trello"
      }
    }
  ],

  e2e: {
    setupNodeEvents(on, config) {
      ///<reference types="cypress" />
    },
  }
});
