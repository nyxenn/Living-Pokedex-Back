import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType } from "sequelize-typescript";

@Table({ timestamps: false, tableName: 'evolution_triggers' })
export class EvolutionTriggers extends Model<EvolutionTriggers> {

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
    public description!: string;
}

export default EvolutionTriggers;