const io = require("socket.io");
const cors = require("cors");

// CORS MIDDLEWARE SETUP
///COMMENT
ioSrv = io();

corsConf = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost"],
};
// ioSrv.use();

ioSrv.on("connection", cors(corsConf), (client) => {
  client.on("subscribeToTimer", (interval) => {
    console.log("client is subscribing to timer with interval ", interval);
    setInterval(() => {
      client.emit("timer", new Date());
    }, interval);
  });
});

const port = 8000;
ioSrv.listen(port);
console.log("listening on port ", port);
