const server = require("./src/app.js");
// const dataBaseFirstLoad = require("./dataBaseFirstLoad.js");
const io = require("./src/socket");
const { connection } = require("./src/watchers.js");
require("./src/events/roomEvents");

// dataBaseFirstLoad();
// Syncing all the models at once.
// conn.sync({ force: true }).then(() => {
server.listen(3001, () => {
  console.log("%s listening at 3001"); // eslint-disable-line no-console
});
// });
