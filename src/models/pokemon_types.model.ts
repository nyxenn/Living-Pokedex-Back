import { Table, Model, AllowNull, Column, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { Pokemon } from "./pokemon.model";
import Types from "./types.model";

@Table({ timestamps: false, tableName: 'pokemon_types' })
export class PokemonTypes extends Model<PokemonTypes> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @ForeignKey(() => Pokemon)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public pokemon_id!: number;

    @ForeignKey(() => Types)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public type_id!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public slot!: number;
    
    @BelongsTo(() => Pokemon, 'pokemon_id')
    public pokemon?: Pokemon;
}

export default PokemonTypes;