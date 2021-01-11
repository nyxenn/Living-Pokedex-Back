import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Encounters from "./encounters.model";
import EncounterMethods from "./encounter_methods.model";
import VersionGroups from "./version_groups.model";

@Table({ timestamps: false, tableName:'encounter_slots' })
export class EncounterSlots extends Model<EncounterSlots> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @ForeignKey(() => VersionGroups)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public version_group_id!: number;

    @ForeignKey(() => EncounterMethods)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public encounter_method_id!: number;

    @AllowNull(true)
    @Column(DataType.SMALLINT)
    public slot?: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public rarity!: number;

    @HasMany(() => Encounters, 'encounter_slot_id')
    public encounters?: Encounters[];

    @BelongsTo(() => VersionGroups)
    public version_group?: VersionGroups;

    @BelongsTo(() => EncounterMethods)
    public encounter_method?: EncounterMethods;
}

export default EncounterSlots;