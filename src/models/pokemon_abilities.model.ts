import { Table, Model, ForeignKey, DataType, Column, AllowNull, BelongsTo, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import { Pokemon } from "./pokemon.model";
import { Abilities } from "./abilities.model";

@Table({ timestamps: false, tableName: "pokemon_abilities" })
export class PokemonAbilities extends Model<PokemonAbilities> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @ForeignKey(() => Pokemon)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public pokemon_id!: number;

    @ForeignKey(() => Abilities)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public ability_id!: number;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    public is_hidden!: boolean;

    @BelongsTo(() => Pokemon, 'pokemon_id')
    public pokemon?: Pokemon;

    @BelongsTo(() => Abilities, 'ability_id')
    public ability?: Abilities;
}

export default PokemonAbilities;