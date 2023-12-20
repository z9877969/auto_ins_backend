const app = require("./app");
const { PORT } = require("./envConfigs");

app.listen(PORT, () => {
  console.log("Servre running on port", PORT);
});
