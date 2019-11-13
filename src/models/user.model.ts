import { Table, Model, PrimaryKey, AllowNull, Column, DataType, Default, Unique } from "sequelize-typescript";

@Table({ timestamps: false, tableName: 'users' })
export class User extends Model<User> {

    @PrimaryKey
    @AllowNull(false)
    @Default(DataType.UUIDV1)
    @Column(DataType.UUID)
    public id?: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    public username!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    public hash!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    public email!: string;

    @AllowNull(false)
    @Column(DataType.STRING(12))
    public display_name!: string;

    @AllowNull(false)
    @Default(Date.now)
    @Column(DataType.DATE)
    public created_date?: string;

    @AllowNull(false)
    @Default([])
    @Column(DataType.ARRAY(DataType.SMALLINT))
    public caught?: number[];

    @AllowNull(false)
    @Default("01")
    @Column(DataType.STRING)
    public selected_style?: string;

    @Column(DataType.STRING(14))
    public friend_code_3ds?: string;

    @Column(DataType.STRING(14))
    public friend_code_switch?: string;
}

export default User;