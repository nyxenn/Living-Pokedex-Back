import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType } from "sequelize-typescript";

@Table({ timestamps: false, tableName:'egg_groups' })
export class EggGroups extends Model<EggGroups> {

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
}

export default EggGroups;