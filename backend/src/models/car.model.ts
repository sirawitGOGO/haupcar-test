import { DataTypes, Model, Sequelize } from "sequelize";
import { CarAttributes } from "../interfaces/interface";

export default function CarModel(sequelize: Sequelize) {
    const Car = sequelize.define<Model<CarAttributes, CarAttributes>>(
        'car',
        {
            carId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            registrationNumber: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false
            },
            note: {
                type: DataTypes.STRING,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            tableName: "cars",
            paranoid: true,
            timestamps: true,
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            deletedAt: "deletedAt"
        }
    );
    return Car;
}