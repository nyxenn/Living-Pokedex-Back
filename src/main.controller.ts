// src/main.controller.ts

import { Application } from "express";
import { PokeService } from "./pokeApi.service";
import { UserService } from "./user.service";
import { checkJwt } from "./helpers/jwt.helper";

export class Controller {
    private pokeService: PokeService;
    private userService: UserService;

    constructor(private app: Application) {
        this.pokeService = new PokeService();
        this.userService = new UserService();        
        this.routes();
    }

    public routes() {
        this.app.route("/pokemons").get(this.pokeService.getAllPokemon);
        this.app.route("/species").get(this.pokeService.getAllPokemonSpecies);
        this.app.route("/speciescount").get(this.pokeService.getPokemonSpeciesCount);
        this.app.route("/getdex/:username").get(this.pokeService.getUserDex);
        this.app.route("/pokedexentries").get(this.pokeService.getPokemonDexInformation);

        this.app.route("/abilities").get(this.pokeService.getAbilities);
        this.app.route("/egggroups").get(this.pokeService.getEggGroups);
        this.app.route("/evolutiontriggers").get(this.pokeService.getEvolutionTriggers);
        this.app.route("/genders").get(this.pokeService.getGenders);
        this.app.route("/items").get(this.pokeService.getItems);
        this.app.route("/locations").get(this.pokeService.getLocations);
        this.app.route("/moves").get(this.pokeService.getMoves);
        this.app.route("/stats").get(this.pokeService.getStats);
        this.app.route("/types").get(this.pokeService.getTypes);
        this.app.route("/versions").get(this.pokeService.getVersions);
        this.app.route("/areas").get(this.pokeService.getLocationAreas);
        this.app.route("/encounterslots").get(this.pokeService.getEncounterSlots);
        this.app.route("/pokeencounters").post(this.pokeService.getPokemonEncountersInfo);

        this.app.route("/register").post(this.userService.addNewUser);
        this.app.route("/login").post(this.userService.login);
        this.app.route("/updateuser").put([checkJwt], this.userService.updateUser);
        this.app.route("/updatehash").put([checkJwt], this.userService.updateHash);

    }
}