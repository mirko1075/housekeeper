const socketio = require("socket.io");

const io = socketio(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// ioSrv.use();

io.on("connection", (client) => {
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
