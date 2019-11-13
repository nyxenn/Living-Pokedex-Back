import { Table, Model, ForeignKey, AllowNull, Column, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript";
import PokemonSpecies from "./pokemon_species.model";

@Table({ timestamps: false, tableName: 'pokemon_species_flavor_text' })
export class PokemonSpeciesFlavorText extends Model<PokemonSpeciesFlavorText> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @ForeignKey(() => PokemonSpecies)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public species_id!: number;

    // #TODO @ForeignKey(() => Versions)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public version_id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    public flavor_text!: string;
    
}

export default PokemonSpeciesFlavorText;