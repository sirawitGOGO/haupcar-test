import { NextFunction, Request, Response } from "express";
import { CarCreateAndUpdateAtrributes } from "../services/dto/car.dto";
import carService from "../services/car.service";

const carController = {
    insert: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req.body as CarCreateAndUpdateAtrributes;
            const newCar = await carService.insert(payload);
            res.json(newCar);
        } catch (error) {
            next(error)
            res.status(500);
        }
    },
    findById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { carId } = req.body as {
                carId: number
            };
            const cars = await carService.findById(carId);
            res.status(200).json(cars);
        } catch (error) {
            next(error)
        }
    },
    findCar: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page, limit } = req.body as {
                page: number,
                limit: number
            };
            const cars = await carService.findCars(page,limit);
            res.status(200).json(cars);
        } catch (error) {
            next(error)
        }
    },
    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req.body as CarCreateAndUpdateAtrributes;
            const newCar = await carService.update(payload);
            res.status(201).json(newCar);
        } catch (error) {
            next(error)
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { carId } = req.body as {
                carId: number
            };
            await carService.delete(carId);
            res.status(204).send();
        } catch (error) {
            next(error)
        }
    },
};

export default carController;