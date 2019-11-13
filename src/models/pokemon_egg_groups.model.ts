import { Table, Model, ForeignKey, Column, DataType, AllowNull, PrimaryKey, AutoIncrement, BelongsTo } from "sequelize-typescript";
import { PokemonSpecies } from "./pokemon_species.model";
import { EggGroups } from "./egg_groups.model";

@Table({ timestamps: false, tableName: 'pokemon_egg_groups' })
export class PokemonEggGroups extends Model<PokemonEggGroups> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @ForeignKey(() => PokemonSpecies)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public species_id!: number;

    @ForeignKey(() => EggGroups)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public egg_group_id!: number;

    @BelongsTo(() => EggGroups, 'egg_group_id')
    public egg_group?: EggGroups;
}

export default PokemonEggGroups