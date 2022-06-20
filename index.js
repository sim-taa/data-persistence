// start your server here
const server = require("./api/server.js");

const port = process.env.PORT || 4007;

server.listen(port, () => console.log(`listening on ${port}`));
