import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import EncounterSlots from "./encounter_slots.model";
import Versions from "./versions.model";

@Table({ timestamps: false, tableName:'version_groups' })
export class VersionGroups extends Model<VersionGroups> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    public identifier!: string;

    // @ForeignKey(() => Generations)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public generation_id!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public order!: number;

    @HasMany(() => EncounterSlots, 'version_group_id')
    public encounter_slots?: EncounterSlots[];

    @HasMany(() => Versions, 'version_group_id')
    public versions?: Versions[];

    // @BelongsTo(() => Generations)
    // public generation?: Generations;
}

export default VersionGroups;