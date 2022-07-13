import { Router } from "express";
import { methods as serviceControllers } from "../controllers/controlService";

const router = Router();

router.get("/v1",serviceControllers.getServices);
router.get("/v1/:serviceID",serviceControllers.getService);
router.post("/v1",serviceControllers.createService);
router.put("/v1/:serviceID",serviceControllers.updateService);
router.delete("/v1/:serviceID",serviceControllers.deleteService);


export default router;