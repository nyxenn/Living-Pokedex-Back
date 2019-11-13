// src/app.ts
import express from "express";
import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Controller } from "./main.controller";
import db from "./database";

class App {
    public app: Application;
    public pokeController: Controller;
    public db = db;

    constructor() {
        this.app = express();
        this.setConfig();
        this.pokeController = new Controller(this.app);
    }

    private setConfig() {
        // Allows receiving requests with data in JSON-format
        this.app.use(bodyParser.json({ limit: "50mb" }));

        // Allows receiving requests with data in x-www-form-urlencoded format
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

        // Enables cors
        this.app.use(cors());
    }

}

export default new App().app;