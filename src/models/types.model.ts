import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType } from "sequelize-typescript";

@Table({ timestamps: false, tableName: 'types' })
export class Types extends Model<Types> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    public identifier!: string;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    public name!: string;

    // #TODO @ForeignKey(() => Generations)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public generation_id!: number;

    // #TODO @ForeignKey(() => DamageClasses)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public damage_class_id!: number;
}

export default Types;