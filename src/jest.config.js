// In jest.config.js add (if you haven't already)

const { defaults } = require("jest-config");
module.exports = {
  setupFilesAfterEnv: ["./setupTests.js"],
};
