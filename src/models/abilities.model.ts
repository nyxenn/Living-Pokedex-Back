import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType, HasMany } from "sequelize-typescript";
import PokemonAbilities from "./pokemon_abilities.model";

@Table({ timestamps: false, tableName: 'abilities' })
export class Abilities extends Model<Abilities> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    public name!: string;

    // #TODO @ForeignKey(() => Generation)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public generation_id!: number;

    @HasMany(() => PokemonAbilities, 'ability_id')
    public pokemon?: PokemonAbilities[];
}

export default Abilities;