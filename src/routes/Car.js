import { Router } from "express";
import { methods as carControllers } from "../controllers/controlCar";

const router = Router();


router.get("/v1",carControllers.getCars);
router.get("/v1/:carID",carControllers.getCar);
router.get("/idcar",carControllers.getCarID);
router.post("/v1",carControllers.createCars);
router.put("/v1/:carID",carControllers.updateCars);
router.delete("/v1/:carID",carControllers.deleteCars);


export default router;