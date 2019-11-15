import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {createConnection} from "typeorm";

import indexRouter from "./routes";
import notesRouter from "./routes/notes";

dotenv.config();

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

function startServer() {
    const port = normalizePort(process.env.PORT || "5000");
    const server = http.createServer(expressApp);
    server
        .listen(port)
        .on("error", error => console.error(error))
        .on("listening", () => console.log("Listening on port " + port));
}

// Connect to DB using TypeORM
createConnection()
    .then(async connection => {
        console.log("TypeORM is connected to Postgres DB...");
        startServer();
    })
    .catch(error => console.log(error));
