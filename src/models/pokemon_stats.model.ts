import { Table, Model, ForeignKey, AllowNull, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { Pokemon } from "./pokemon.model";
import { Stats } from "./stats.model";

@Table({ timestamps: false, tableName: 'pokemon_stats' })
export class PokemonStats extends Model<PokemonStats> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @ForeignKey(() => Pokemon)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public pokemon_id!: number;

    @ForeignKey(() => Stats)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public stat_id!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public base_stat!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public effort!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public order!: number;
    
}

export default PokemonStats;