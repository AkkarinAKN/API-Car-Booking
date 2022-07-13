import { Router } from "express";
import { methods as bookingControllers } from "../controllers/controBooking";

const router = Router();
router.get("/v1",bookingControllers.getBookings);
router.post("/v1",bookingControllers.createBooking);
router.put("/v1/status/:bookingID",bookingControllers.isStatusBooking);


export default router;