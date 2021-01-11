import { Table, Model, PrimaryKey, AutoIncrement, AllowNull, Column, DataType, HasMany } from "sequelize-typescript";
import EncounterSlots from "./encounter_slots.model";

@Table({ timestamps: false, tableName:'encounter_methods' })
export class EncounterMethods extends Model<EncounterMethods> {

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public id!: number;

    @AllowNull(false)
    @Column(DataType.STRING(20))
    public identifier!: string;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public order!: number;

    @AllowNull(false)
    @Column(DataType.STRING(40))
    public name!: string;

    @HasMany(() => EncounterSlots, 'encounter_method_id')
    public encounter_slots?: EncounterSlots[];
}

export default EncounterMethods;