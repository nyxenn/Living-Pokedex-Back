import {Table, Column, Model, HasOne, ForeignKey, PrimaryKey, AutoIncrement, DataType, AllowNull, HasMany, Scopes} from 'sequelize-typescript';
import { PokemonSpecies } from "./pokemon_species.model";
import { PokemonAbilities } from './pokemon_abilities.model';
import { PokemonTypes } from './pokemon_types.model';
import PokemonStats from './pokemon_stats.model';
import Encounters from './encounters.model';

@Table({ timestamps: false, tableName: 'pokemon' })
export class Pokemon extends Model<Pokemon> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id?: number;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    public identifier!: string;

    @AllowNull(false)
    @ForeignKey(() => PokemonSpecies)
    @Column(DataType.INTEGER)
    public species_id!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public height!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public weight!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public base_experience!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public order!: number;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    public is_default!: boolean;

    @HasOne(() => PokemonSpecies)
    public species?: PokemonSpecies;

    @HasMany(() => PokemonAbilities, 'pokemon_id')
    public ability_ids?: PokemonAbilities[];

    @HasMany(() => PokemonTypes, 'pokemon_id')
    public type_ids?: PokemonTypes[];

    @HasMany(() => PokemonStats, 'pokemon_id')
    public stats?: PokemonStats[];

    @HasMany(() => Encounters, 'pokemon_id')
    public encounters?: Encounters[];
}

export default Pokemon;