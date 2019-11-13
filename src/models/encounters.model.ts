import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import EncounterSlots from "./encounters_slots.model";
import Pokemon from "./pokemon.model";
import Versions from "./versions.model";
import LocationAreas from "./location_areas.model";

@Table({ timestamps: false, tableName:'encounters' })
export class Encounters extends Model<Encounters> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @ForeignKey(() => Versions)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public version_id!: number;

    @ForeignKey(() => LocationAreas)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public location_area_id!: number;

    @ForeignKey(() => EncounterSlots)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public encounter_slot_id!: number;

    @ForeignKey(() => Pokemon)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public pokemon_id!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public min_level!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public max_level!: number;

    @BelongsTo(() => Versions)
    public version?: Versions;

    @BelongsTo(() => LocationAreas)
    public location_area?: LocationAreas;

    @BelongsTo(() => EncounterSlots)
    public encounter_slot?: EncounterSlots;

    @BelongsTo(() => Pokemon)
    public pokemon?: Pokemon;
}

export default Encounters;