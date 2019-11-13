import { Table, Column, ForeignKey, Model, PrimaryKey, AutoIncrement, AllowNull, DataType, HasOne, HasMany, BelongsTo } from "sequelize-typescript";
import { PokemonEggGroups } from "./pokemon_egg_groups.model";
import { Pokemon } from "./pokemon.model";
import PokemonEvolution from "./pokemon_evolution.model";
import { PokemonSpeciesFlavorText } from "./pokemon_species_flavor_text.model";

@Table({ timestamps: false, tableName: 'pokemon_species' })
export class PokemonSpecies extends Model<PokemonSpecies> {

    @PrimaryKey
    @ForeignKey(() => Pokemon)
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id?: number;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    public name!: string;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    public genus!: string;

    // #TODO @ForeignKey(() => Generation)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public generation_id!: number;

    @AllowNull(true)
    @ForeignKey(() => PokemonSpecies)
    @Column(DataType.INTEGER)
    public evolves_from_species_id?: number;

    // #TODO @ForeignKey(() => EvolutionChain)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public evolution_chain_id!: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    public color_id!: number;

    // #TODO @ForeignKey(() => PokemonShapes)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public shape_id!: number;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    public habitat_id?: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    public gender_rate!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public capture_rate!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public base_happiness!: number;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    public is_baby!: boolean;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public hatch_counter!: number;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    public has_gender_differences!: boolean;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    public growth_rate_id!: number;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    public forms_switchable!: boolean;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public order!: number;

    @BelongsTo(() => PokemonSpecies, 'evolves_from_species_id')
    public evolved_from?: PokemonSpecies;

    @HasMany(() => PokemonEggGroups, 'species_id')
    public egg_group_ids?: PokemonEggGroups[];

    @HasOne(() => PokemonEvolution, 'evolved_species_id')
    public evolution?: PokemonEvolution;

    @HasMany(() => PokemonSpeciesFlavorText, 'species_id')
    public flavor_text?: PokemonSpeciesFlavorText[];
};

export default PokemonSpecies;