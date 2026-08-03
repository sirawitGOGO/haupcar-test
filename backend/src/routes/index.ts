import { Router } from "express";
import carRouter from "./car.route";

const router = Router();

router.use("/car", carRouter);

export default router;