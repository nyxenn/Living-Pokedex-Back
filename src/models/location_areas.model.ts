import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Locations from "./locations.model";

@Table({ timestamps: false, tableName:'location_areas' })
export class LocationAreas extends Model<LocationAreas> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @ForeignKey(() => Locations)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public location_id!: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public game_index!: number;

    @AllowNull(true)
    @Column(DataType.STRING(40))
    public identifier?: number;

    @AllowNull(true)
    @Column(DataType.STRING(40))
    public name?: number;

    @BelongsTo(() => Locations)
    public location?: Locations;
}

export default LocationAreas;