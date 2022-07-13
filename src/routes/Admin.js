import { Router } from "express";
import { methods as adminControllers } from "../controllers/controlAdmins";

const router = Router();

router.post("/v1",adminControllers.Register);
router.post("/v1/login",adminControllers.login)


export default router;