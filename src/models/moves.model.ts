import { Table, Model, PrimaryKey, AllowNull, Column, DataType, AutoIncrement, ForeignKey } from "sequelize-typescript";
import { Types } from "./types.model";

@Table({ timestamps: false, tableName: 'moves' })
export class Moves extends Model<Moves> {

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

    // #TODO @ForeignKey(() => Generations)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public generation_id!: number;

    @ForeignKey(() => Types)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public type_id!: number;

    @AllowNull(true)
    @Column(DataType.SMALLINT)
    public power?: number;
    
    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public pp!: number;

    @AllowNull(true)
    @Column(DataType.SMALLINT)
    public accuracy?: number;

    @AllowNull(false)
    @Column(DataType.SMALLINT)
    public priority?: number;

    // #TODO @ForeignKey(() => MoveTargets)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public target_id!: number;

    // #TODO @ForeignKey(() => DamageClasses)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public damage_class_id!: number;

    // #TODO @ForeignKey(() => MoveEffects)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    public effect_id!: number;

    @AllowNull(true)
    @Column(DataType.SMALLINT)
    public effect_chance?: number;
}

export default Moves;