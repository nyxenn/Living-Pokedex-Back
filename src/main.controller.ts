// src/main.controller.ts

import { Application } from "express";
import { PokeService } from "./pokeApi.service";

export class Controller {
    private pokeService: PokeService;

    constructor(private app: Application) {
        this.pokeService = new PokeService();
        this.routes();
    }

    public routes() {
        this.app.route("/").get(this.pokeService.welcomeMessage);
    }

}