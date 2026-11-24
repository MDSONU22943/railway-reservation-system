const app = require("./src/app");

const PORT = process.env.PORT || 3002;

// Do not start a server when this module is imported by a test.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`RailBook Phase 1 server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
