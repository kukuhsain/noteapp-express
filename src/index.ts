import "reflect-metadata";
import {createConnection} from "typeorm";
import {startServer} from "./app";

createConnection()
    .then(async connection => {
        console.log("TypeORM is connected to Postgres DB...");
        startServer();
    })
    .catch(error => console.log(error));
