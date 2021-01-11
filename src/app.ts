// src/app.ts
import express from "express";
import { Application } from "express";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import { Controller } from "./main.controller";
import db from "./database";

class App {
    public app: Application;
    public pokeController: Controller;
    public db = db;

    
    public corsOptions: CorsOptions = {
        origin: function (origin: any, callback) {
            let allowedOrigins = [
                'http://localhost',
                'http://localhost:4200',
                'http://livingdex.redirectme.net',
                'http://livingdex.redirectme.net:8888',
            ];
            
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }

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
        this.app.use(cors(this.corsOptions));
    }

}

export default new App().app;