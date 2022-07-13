import { getConnection } from "../database/database";

const getCars = async (req, res,next) => {
  try {
    const conn = await getConnection();
    const carResult = await conn.query(
      "select carID,carName,carSeat from cars"
    );
    console.log(carResult);
    res.status(200).json(carResult);
  } catch (error) {
    next(err);
  }
};

const getCarID = async (req, res,next) => {
  try {
    const conn = await getConnection();
    const carResult = await conn.query(
      "select carID from cars"
    );
    console.log(carResult);
    res.status(200).json(carResult);
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

const createCars = async (req, res,next) => {
  try {
    const { carName, carSeat } = req.body;
    if (carName === undefined || carSeat === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }
    const car = {
      carName,
      carSeat,
    };
    console.log(carName);
    console.log(carSeat);
    const conn = await getConnection();
    await conn.query("insert into cars set ?", car);
    res.status(201).json({ message: "Created Successfully" });
  } catch (error) {
    next(err);
  }
};

const updateCars = async (req, res,next) => {
  try {
    // console.log(req.params);
    const { carID } = req.params;
    const { carName, carSeat } = req.body;
    if (carID === undefined || carName === undefined || carSeat === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }
    const car = {
      carName,
      carSeat,
    };
    const conn = await getConnection();
    await conn.query("update cars set ? where carID = ?", [car, carID]);
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
  getCars,
  getCar,
  getCarID,
  createCars,
  updateCars,
  deleteCars,
};
