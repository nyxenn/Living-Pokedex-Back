import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import Encounters from "./encounters.model";
import VersionGroups from "./version_groups.model";

@Table({ timestamps: false, tableName:'versions' })
export class Versions extends Model<Versions> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @ForeignKey(() => VersionGroups)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public version_group_id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    public identifier!: string;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    public name!: string;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    public is_main_series!: boolean;

    @HasMany(() => Encounters, 'version_id')
    public encounter_slots?: Encounters[];

    @BelongsTo(() => VersionGroups)
    public generation?: VersionGroups;
}

export default Versions;