import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType, HasMany } from "sequelize-typescript";
import LocationAreas from "./location_areas.model";

@Table({ timestamps: false, tableName:'locations' })
export class Locations extends Model<Locations> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    // #TODO @ForeignKey(() => Regions)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public region_id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    public identifier!: string;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    public name!: string;

    @AllowNull(true)
    @Column(DataType.STRING(40))
    public subtitle?: string;

    @HasMany(() => LocationAreas, 'location_id')
    public areas?: LocationAreas[];
}

export default Locations;