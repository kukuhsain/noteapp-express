const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const notesRouter = require("./routes/notes");

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

const expressApp = express();
expressApp
  .use(logger("dev"))
  .use(express.json())
  .use(express.urlencoded({extended: false}))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")));

// Routing
expressApp
  .use("/", indexRouter)
  .use("/notes", notesRouter);

const http = require("http");
const port = normalizePort(process.env.PORT || "5000");
const server = http.createServer(expressApp);
server
  .listen(port)
  .on("error", error => console.error(error))
  .on("listening", () => console.log("Listening on port " + port));
