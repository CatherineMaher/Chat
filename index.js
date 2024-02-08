const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const PORT = process.env.PORT || 7004;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
