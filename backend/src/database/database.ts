import { Dialect, Sequelize } from "sequelize";
import configs from "../configs/config";
import CarModel from "../models/car.model";

const sequelize = new Sequelize(
    configs.dbName,
    configs.dbUsername,
    configs.dbPassword,
    {
        host: configs.dbHost,
        port: configs.dbPort,
        dialect: configs.dbDialect as Dialect,
    }
);

const carModel = CarModel(sequelize);
const database = {
    sequelize,
    Sequelize,
    carModel
};

export default database;
