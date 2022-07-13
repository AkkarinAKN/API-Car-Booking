import { getConnection } from "../database/database";

const getServices = async (req, res,next) => {
  try {
    const conn = await getConnection();
    const serviceResult = await conn.query(
      "select services.serviceID, services.From, services.To, cars.carName, cars.carSeat, services.serviceCharge from services inner join cars on services.carID = cars.carID"
    );
    console.log(serviceResult);
    res.status(200).json(serviceResult);
  } catch (error) {
    next(err);
  }
};

const getService = async (req, res,next) => {
  try {
    const { serviceID } = req.params;
    const conn = await getConnection();
    const serviceResult = await conn.query(
      "select services.serviceID, services.From, services.To, cars.carName, cars.carSeat, services.serviceCharge from services inner join cars on services.carID = cars.carID where services.serviceID = ?",
      serviceID
    );
    console.log(serviceResult);
    res.status(200).json(serviceResult);
  } catch (error) {
    next(err);
  }
};

const createService = async (req, res,next) => {
  try {
    const { From, To, carID, serviceCharge } = req.body;
    if (From === undefined || To === undefined || carID === undefined || serviceCharge === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all field." });
    }
    const service = {
        From,
        To,
        carID,
        serviceCharge
    };
    // console.log(carName);
    // console.log(carSeat);
    const conn = await getConnection();
    await conn.query("insert into services set ?", service);
    res.status(201).json({ message: "Created Successfully" });
  } catch (error) {
    next(err);
  }
};

const updateService = async (req, res,next) => {
    try {
      // console.log(req.params);
      const { serviceID } = req.params;
      const { From, To, carID, serviceCharge } = req.body;
      if (From === undefined || To === undefined || carID === undefined || serviceCharge === undefined) {
        res.status(400).json({ message: "Bad Request. Please fill all field." });
      }
      const service = {
        From,
        To,
        carID,
        serviceCharge
    };
      const conn = await getConnection();
      await conn.query("update services set ? where serviceID = ?", [service, serviceID]);
      res.json({ message: "Update Successfully" });
    } catch (error) {
      next(err);
    }
  };
  
  const deleteService = async (req, res,next) => {
    try {
      // console.log(req.params);
      const { serviceID } = req.params;
      const conn = await getConnection();
      await conn.query("delete from services where serviceID = ?", serviceID);
      res.json({ message: "Deleted Successfully" });
    } catch (error) {
      next(err);
    }
  };

export const methods = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
};
