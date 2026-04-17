const { defineConfig } = require("cypress");

module.exports = defineConfig({
 // allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

     baseUrl:"https://practicesoftwaretesting.com/",

      env: {
      API_BASE_URL: process.env.API_BASE_URL || "https://api.practicesoftwaretesting.com",
    },

      viewportWidth: 1280,
      viewportHeight: 720,

// mi arreglo para evitar errores de latencia los Domingos por internet latinoamericano :) 
defaultCommandTimeout: 10000,
pageLoadTimeout: 60000,
 requestTimeout: 10000, 
  },
});
