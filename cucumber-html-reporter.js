const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./cypress/cucumberReports",
  reportPath: "./cypress/cucumberReports/cucumber-htmlreport.html",
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "Mac OS",
    platform: {
      name: "ubuntu",
      version: "16.04",
    },
  },
  customData: {
    title: "Run information",
    data: [
      { label: "Project", value: "Cypress Automation Udemy project" },
      { label: "Release", value: "99.99.99" },
      { label: "Cycle", value: "B11221.34321" },
      { label: "Execution Start Time", value: "Jan, 31st,2024, 02:31 PM EST" },
      { label: "Execution End Time", value: "Jan 31st 2024" },
    ],
  },
});