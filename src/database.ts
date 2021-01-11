import { Sequelize } from "sequelize-typescript";
import { DB, DB_USER, DB_USER_PASS, DB_HOST, DB_DIALECT } from "./constants/pokeApi.constants";

class Database {
    public db: Sequelize;

    constructor() {
        this.db = this.setDbConfig();
        this.db.authenticate()
            .then(() => console.log("Database connected..."))
            .catch((err: Error) => console.log('Error', err));
    }

    private setDbConfig() {
        return new Sequelize(DB, DB_USER, DB_USER_PASS, {
            host: DB_HOST,
            dialect: DB_DIALECT,
            models: [__dirname + '/models/*.model.ts'],
            modelMatch: (filename, member) => { return filename.substring(0, filename.indexOf('.model')) === this.toSnakeCase(member); },
            logging: false,

            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                timestamps: false
            }
        });
    }

    private toSnakeCase(str: string) {
        return str && str
                        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                        ?.map(x => x.toLowerCase())
                        .join('_');
    }

}

export default new Database().db;