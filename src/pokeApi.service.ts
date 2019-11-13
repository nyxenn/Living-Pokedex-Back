// src/services/pokemon.service.ts

import { Request, Response } from "express";
import { PokemonSpecies } from "./models/pokemon_species.model";
import Pokemon from "./models/pokemon.model";
import { User } from "./models/user.model";
import PokemonAbilities from "./models/pokemon_abilities.model";
import PokemonTypes from "./models/pokemon_types.model";
import PokemonEggGroups from "./models/pokemon_egg_groups.model";
import PokemonEvolution from "./models/pokemon_evolution.model";
import Abilities from "./models/abilities.model";
import EggGroups from "./models/egg_groups.model";
import EvolutionTriggers from "./models/evolution_triggers.model";
import Genders from "./models/genders.model";
import Items from "./models/items.model";
import Locations from "./models/locations.model";
import Moves from "./models/moves.model";
import Stats from "./models/stats.model";
import Types from "./models/types.model";
import PokemonStats from "./models/pokemon_stats.model";
import { PokemonSpeciesFlavorText } from "./models/pokemon_species_flavor_text.model";
import LocationAreas from "./models/location_areas.model";
import EncounterSlots from "./models/encounters_slots.model";
import VersionGroups from "./models/version_groups.model";
import Versions from "./models/versions.model";
import EncounterMethods from "./models/encounters_methods.model";
import Encounters from "./models/encounters.model";
import { Op } from "sequelize";

export class PokeService {

    // Get all db/pokemon
    public getAllPokemon(req: Request, res: Response) {
        Pokemon.findAll()
            .then(pokemon => res.status(200).json(pokemon))
            .catch(err => res.send(err));
    }

    // Get all db/pokemon_species
    public getAllPokemonSpecies(req: Request, res: Response) {
        PokemonSpecies.findAll({ order: [['id', 'ASC']] })
            .then(species => res.status(200).json(species))
            .catch(err => res.send(err));
    }

    // Get number of documents in species collection
    public getPokemonSpeciesCount(req: Request, res: Response) {
        PokemonSpecies.count()
            .then(speciesCount => res.status(200).json(speciesCount))
            .catch(err => res.send(err));
    }

    // Get user's caught pokemon
    public getUserDex(req: Request, res: Response) {
        if (!req.params.username) {
            res.sendStatus(400);
            return;
        }
        const username = req.params.username.toLowerCase();
        User.findOne({ where: { username }})
            .then(user => {
                if (!user) {
                    res.sendStatus(400);
                    return;
                }

                res.status(200).json({
                    caught: user.caught,
                    display_name: user.display_name,
                    style: user.selected_style,
                    friend_code_3ds: user.friend_code_3ds,
                    friend_code_switch: user.friend_code_switch
                });
            })
            .catch(err => res.send(err));
    }

    public getPokemonDexInformation(req: Request, res: Response) {
        Pokemon.findAll({
            include: [
              {
                model: PokemonSpecies,
                required: true,
                include: [
                  {
                    model: PokemonEggGroups,
                    attributes: ['egg_group_id'],
                  },
                  {
                    model: PokemonEvolution,
                    attributes: { exclude: ['id', 'evolved_species_id']}
                  },
                  {
                      model: PokemonSpeciesFlavorText,
                      attributes: { exclude: ['id', 'species_id']},
                      separate: true,
                      order: [ ['version_id', 'DESC'] ]
                  }
                ]
              },
              {
                model: PokemonAbilities,
                attributes: ['ability_id', 'is_hidden'],
                separate: true,
                // order: ['is_hidden']
              },
              {
                model: PokemonTypes,
                attributes: ['type_id', 'slot'],
                separate: true,
                order: ['slot'],
              },
              {
                  model: PokemonStats,
                  attributes: ['stat_id', 'base_stat', 'effort', 'order'],
                  separate: true,
                  order: ['order'],
              }
            ]
          }).then((pokemon: any) => {
                if(!pokemon) {
                    res.sendStatus(400);
                    return;
                }

                const returnObject = pokemon.map((poke: any) => {
                    return Object.assign(
                        {},
                        {
                            id: poke.id,
                            species:
                                {
                                    name: poke.species.name ,
                                    genus: poke.species.genus,
                                    height: poke.height,
                                    weight: poke.weight,
                                    capture_rate: poke.species.capture_rate,
                                    base_experience: poke.base_experience,
                                    base_happiness: poke.species.base_happiness,
                                    hatch_counter: poke.species.hatch_counter,
                                    form_switchable: poke.species.forms_switchable,
                                    is_default: poke.is_default,
                                    introduced_in: poke.species.generation_id,
                                    evolves_from_species_id: poke.species.evolves_from_species_id,
                                    evolution_chain_id: poke.species.evolution_chain_id
                                },
                           evolution: poke.species.evolution,
                           ability_ids: poke.ability_ids,
                           type_ids: poke.type_ids,
                           egg_group_ids: poke.species.egg_group_ids,
                           stats: poke.stats,
                           flavor: poke.species.flavor_text[0]
                        }
                    );
                });
                res.json(returnObject);
            })
            .catch((err: Error) => res.status(400).send(err));
    }

    public getAbilities(req: Request, res: Response) {
        Abilities.findAll()
            .then(abilities => res.status(200).json(abilities))
            .catch((err: Error) => res.send(err));
    }
    public getEggGroups(req: Request, res: Response) {
        EggGroups.findAll()
            .then(egg_groups => res.status(200).json(egg_groups))
            .catch((err: Error) => res.send(err));
    }
    public getEvolutionTriggers(req: Request, res: Response) {
        EvolutionTriggers.findAll()
            .then(evolution_triggers => res.status(200).json(evolution_triggers))
            .catch((err: Error) => res.send(err));
    }
    public getGenders(req: Request, res: Response) {
        Genders.findAll()
            .then(genders => res.status(200).json(genders))
            .catch((err: Error) => res.send(err));
    }
    public getItems(req: Request, res: Response) {
        Items.findAll()
            .then(items => res.status(200).json(items))
            .catch((err: Error) => res.send(err));
    }
    public getLocations(req: Request, res: Response) {
        Locations.findAll()
            .then(locations => res.status(200).json(locations))
            .catch((err: Error) => res.send(err));
    }
    public getMoves(req: Request, res: Response) {
        Moves.findAll()
            .then(moves => res.status(200).json(moves))
            .catch((err: Error) => res.send(err));
    }
    public getStats(req: Request, res: Response) {
        Stats.findAll()
            .then(stats => res.status(200).json(stats))
            .catch((err: Error) => res.send(err));
    }
    public getTypes(req: Request, res: Response) {
        Types.findAll()
            .then(types => res.status(200).json(types))
            .catch((err: Error) => res.send(err));
    }

    public getVersions(req: Request, res: Response) {
        Versions.findAll({ where: {is_main_series: true}, include: [VersionGroups] })
            .then(versions => res.status(200).json(versions))
            .catch((err: Error) => res.send(err));
    }
    
    public getLocationAreas(req: Request, res: Response) {
        LocationAreas.findAll({ include: [Locations]})
            .then(areas => res.status(200).json(areas))
            .catch((err: Error) => res.send(err));
    }

    public getEncounterSlots(req: Request, res: Response) {
        EncounterSlots.findAll({ include: [{ model: VersionGroups, include: [Versions] }, EncounterMethods] })
            .then(slots => res.status(200).json(slots))
            .catch((err: Error) => res.send(err));
    }

    public getPokemonEncountersInfo(req: Request, res: Response) {
        if (!req.body) {
            return res.sendStatus(400);
        }
        const pokemon_ids = req.body;

        Encounters.findAll({
                where: { pokemon_id: { [Op.in]: pokemon_ids } },
                include: [
                    Versions,
                    { model: LocationAreas, include: [Locations] },
                    { model: EncounterSlots, include: [EncounterMethods] }
                ]
            })
            .then((encounters: any) => {
                const returnObject = encounters.map((enc: any) => {

                    let place = enc.location_area.location.name
                    enc.location_area.location.subtitle ? place += enc.location_area.location.subtitle : null;

                    return Object.assign(
                        {},
                        {   
                            pokemon_id: enc.pokemon_id,
                            version_id: enc.version_id,
                            game: enc.version.name,
                            place,
                            method: enc.encounter_slot.encounter_method.name,
                            rarity: enc.encounter_slot.rarity,
                            min_level: enc.min_level,
                            max_level: enc.max_level,
                        }
                    );
                });

                res.status(200).json(returnObject);
            })
            .catch((err: Error) => res.send(err));
    }

}