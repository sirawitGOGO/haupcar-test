import { Router } from "express";
import carController from "../controllers/car.controller";

const carRouter = Router();

carRouter.post("/insert", carController.insert);
carRouter.post("/findById", carController.findById);
carRouter.post("/findCar", carController.findCar);
carRouter.post("/update", carController.update);
carRouter.delete("/delete", carController.delete);

export default carRouter;