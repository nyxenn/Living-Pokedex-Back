import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType } from "sequelize-typescript";

@Table({ timestamps: false, tableName:'genders' })
export class Genders extends Model<Genders> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    public identifier!: string;
    
}

export default Genders;