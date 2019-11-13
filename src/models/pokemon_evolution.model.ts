import { Table, Model, PrimaryKey, AllowNull, Column, AutoIncrement, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { PokemonSpecies } from "./pokemon_species.model";
import EvolutionTriggers from "./evolution_triggers.model";
import Items from "./items.model";
import Genders from "./genders.model";
import Locations from "./locations.model";
import Moves from "./moves.model";
import Types from "./types.model";

@Table({ timestamps: false, tableName: 'pokemon_evolution' })
export class PokemonEvolution extends Model<PokemonEvolution> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id?: number;

    @ForeignKey(() => PokemonSpecies)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public evolved_species_id!: number;

    @ForeignKey(() => EvolutionTriggers)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public evolution_trigger_id!: number;

    @ForeignKey(() => Items)
    @Column(DataType.INTEGER)
    public trigger_item_id?: number;

    @Column(DataType.SMALLINT)
    public minimum_level?: number;

    @ForeignKey(() => Genders)
    @Column(DataType.INTEGER)
    public gender_id?: number;

    @ForeignKey(() => Locations)
    @Column(DataType.INTEGER)
    public location_id?: number;

    @ForeignKey(() => Items)
    @Column(DataType.INTEGER)
    public held_item_id?: number;

    @Column(DataType.STRING(10))
    public time_of_day?: string;

    @ForeignKey(() => Moves)
    @Column(DataType.INTEGER)
    public known_move_id?: number;

    @ForeignKey(() => Moves)
    @Column(DataType.INTEGER)
    public known_move_type_id?: number;

    @Column(DataType.SMALLINT)
    public minimum_happiness?: number;

    @Column(DataType.SMALLINT)
    public minimum_beauty?: number;

    @Column(DataType.SMALLINT)
    public minimum_affection?: number;

    @Column(DataType.SMALLINT)
    public relative_physical_stats?: number;

    @ForeignKey(() => PokemonSpecies)
    @Column(DataType.INTEGER)
    public party_species_id?: number;

    @ForeignKey(() => Types)
    @Column(DataType.INTEGER)
    public party_type_id?: number;

    @ForeignKey(() => PokemonSpecies)
    @Column(DataType.INTEGER)
    public trade_species_id?: number;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    public needs_overworld_rain!: boolean;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    public turn_upside_down!: boolean;

    @BelongsTo(() => EvolutionTriggers)
    public trigger?: EvolutionTriggers;

    @BelongsTo(() => Items)
    public trigger_item?: Items;

    @BelongsTo(() => Genders)
    public gender?: Genders;

    @BelongsTo(() => Locations)
    public location?: Locations;

    @BelongsTo(() => Items)
    public held_item?: Items;

    @BelongsTo(() => Moves)
    public known_move?: Moves;

    @BelongsTo(() => Types)
    public known_move_type?: Types;

    @BelongsTo(() => PokemonSpecies)
    public party_species?: PokemonSpecies;

    @BelongsTo(() => Types)
    public party_species_type?: Types;

    @BelongsTo(() => PokemonSpecies)
    public trade_species?: PokemonSpecies;
}

export default PokemonEvolution;