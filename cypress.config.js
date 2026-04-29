const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: false,
    json: true
  },

  e2e: {
    setupNodeEvents(on, config) {
      const reportsDir = 'cypress/reports';
      const reportFile = path.join(reportsDir, 'security-issues.json');

      on('task', {
        clearSecurityReport() {
          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
          }
          fs.writeFileSync(reportFile, JSON.stringify([]));
          return null;
        },

        logSecurityIssue({ endpoint, missingHeaders }) {
          let issues = [];
          if (fs.existsSync(reportFile)) {
            issues = JSON.parse(fs.readFileSync(reportFile, 'utf-8'));
          }
          issues.push({ endpoint, missingHeaders });
          fs.writeFileSync(reportFile, JSON.stringify(issues, null, 2));
          return null;
        },

        log(message) {
          console.log(message);
          return null;
        },
      });

      return config;
    },

    baseUrl: "https://practicesoftwaretesting.com/",

    env: {
      API_BASE_URL: process.env.API_BASE_URL || "https://api.practicesoftwaretesting.com",
    },

    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 10000,
  },
});