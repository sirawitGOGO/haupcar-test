import database from "../database/database";
import { CarAttributes } from "../interfaces/interface";
import { CarCreateAndUpdateAtrributes, CarPaginationResponse } from "./dto/car.dto";

const carService = {
    insert: async (
        payload: CarCreateAndUpdateAtrributes
    ): Promise<CarAttributes> => {
        const existCar = await database.carModel.findOne({
            where: {
                registrationNumber: payload.registrationNumber
            }
        });
        if (existCar) {
            throw new Error("this car already exist");
        }

        const newCar = await database.carModel.create({
            ...payload
        } as CarAttributes);
        return newCar.dataValues;
    },
    findById: async (
        carId: number
    ): Promise<CarAttributes> => {
        const car = await database.carModel.findByPk(carId);
        if (!car) {
            throw new Error("car not found");
        }
        return car.dataValues;
    },
    findCars: async (
        page: number,
        limit: number
    ): Promise<CarPaginationResponse> => {
        const { count, rows } = await database.carModel.findAndCountAll({
            order: [
                ["createdAt", "DESC"]
            ],
            limit: limit,
            offset: (page - 1) * limit,
        });
        if (rows.length === 0) {
            return {
                totalItems: count,
                totalPages: 0,
                currentPage: page,
                cars: []
            }
        }
        return {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            cars: rows.map(car => car.dataValues)
        }
    },
    update: async (
        payload: CarCreateAndUpdateAtrributes
    ): Promise<CarAttributes> => {
        const car = await database.carModel.findByPk(payload.carId);
        if (!car) {
            throw new Error("car not found");
        }
        const updateCar = await car.update(payload);
        return updateCar.dataValues;
    },
    delete: async (
        carId: number
    ): Promise<void> => {
        const car = await database.carModel.findByPk(carId);
        if (!car) {
            throw new Error("car not found");
        }
        await car.destroy();
    }
};

export default carService;