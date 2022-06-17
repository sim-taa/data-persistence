// start your server here
const server = require("./api/server.js");

const port = process.env.PORT || 19000;

server.listen(port, () => console.log(`listening on ${port}`));
