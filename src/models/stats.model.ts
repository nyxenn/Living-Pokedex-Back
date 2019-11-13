import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType } from "sequelize-typescript";

@Table({ timestamps: false, tableName: 'stats' })
export class Stats extends Model<Stats> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    // #TODO @PrimaryKey(() => DamageClasses)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    public damage_class_id?: number;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    public identifier!: string;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    public name!: string;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    public is_battle_only!: boolean;

}

export default Stats;