import { getConnection } from "../database/database";

const getBookings = async (req, res,next) => {
  try {
    const conn = await getConnection();
    const bookingResult = await conn.query(
      "select bookings.bookingID, bookings.customerName, bookings.customerEmail, bookings.phoneNumber, services.From, services.To, cars.carName, cars.carSeat from bookings inner join services on bookings.serviceID = services.serviceID inner join cars on services.carID = cars.carID"
    );
    console.log(bookingResult);
    res.status(200).json(bookingResult);
  } catch (error) {
    next(err);
  }
};

const getCar = async (req, res,next) => {
  try {
    const { carID } = req.params;
    const conn = await getConnection();
    const carResult = await conn.query(
      "select carID,carName,carSeat from cars where carID = ? ",
      carID
    );
    console.log(carResult);
    res.status(200).json(carResult);
  } catch (error) {
    next(err);
  }
};

const createBooking = async (req, res,next) => {
  try {
    const {
      customerName,
      customerEmail,
      phoneNumber,
      serviceID,
      desc,
      Date,
      Time,
    } = req.body;
    // if (carName === undefined || carSeat === undefined) {
    //   res.status(400).json({ message: "Bad Request. Please fill all field." });
    // }
    const booking = {
      customerName,
      customerEmail,
      phoneNumber,
      serviceID,
      desc,
      Date,
      Time,
    };
    // console.log(carName);
    // console.log(carSeat);
    const conn = await getConnection();
    await conn.query("insert into bookings set ?", booking);
    res.status(201).json({ message: "Created Successfully" });
  } catch (error) {
    next(err);
  }
};

const isStatusBooking = async (req, res,next) => {
  try {
    // console.log(req.params);
    const { bookingID } = req.params;
    const { isStatus } = req.body;
    // if (carID === undefined || carName === undefined || carSeat === undefined) {
    //   res.status(400).json({ message: "Bad Request. Please fill all field." });
    // }
    const booking = {
        isStatus,
    };
    const conn = await getConnection();
    await conn.query("update bookings set ? where bookingID = ?", [booking, bookingID]);
    res.json({ message: "Update Successfully" });
  } catch (error) {
    next(err);
  }
};

const deleteCars = async (req, res,next) => {
  try {
    // console.log(req.params);
    const { carID } = req.params;
    const conn = await getConnection();
    await conn.query("delete from cars where carID = ?", carID);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    next(err);
  }
};

export const methods = {
  getBookings,
  createBooking,
  isStatusBooking,
  deleteCars,
};
