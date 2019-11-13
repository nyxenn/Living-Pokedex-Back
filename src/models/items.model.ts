import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType, Default } from "sequelize-typescript";

@Table({ timestamps: false, tableName:'items' })
export class Items extends Model<Items> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    public identifier!: string;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    public name!: string;

    // #TODO @ForeignKey(() => ItemCategories)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public category_id!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    public cost!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    public short_effect!: string;
}

export default Items;