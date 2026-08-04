import { Router } from "express";
import carController from "../controllers/car.controller";

const carRouter = Router();

carRouter.post("/insert", carController.insert);
carRouter.get("/findById/:carId", carController.findById);
carRouter.post("/findCar", carController.findCar);
carRouter.post("/update", carController.update);
carRouter.delete("/delete/:carId", carController.delete);

export default carRouter;