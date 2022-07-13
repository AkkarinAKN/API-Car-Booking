import { getConnection } from "../database/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// const getCars = async (req, res) => {
//   try {
//     const conn = await getConnection();
//     const carResult = await conn.query(
//       "select carID,carName,carSeat from cars"
//     );
//     console.log(carResult);
//     res.status(200).json(carResult);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

const login = async (req, res,next) => {
  try {
    const { email } = req.body;
    const conn = await getConnection();
    const adminResult = await conn.query(
      "select * from admins where email = ?",
      email
    );
    if (adminResult.length === 0) {
      return res.status(404).json({ message: "USER NOT FOUND!" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      adminResult[0].password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Wrong Password of Username !!" });
    } 

    const token = jwt.sign(
      { adminID:adminResult[0].adminID, isAdmin: adminResult[0].isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = adminResult;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });

    // console.log(adminResult);
    // res.json({ message: "Created Successfully",token });
  } catch (error) {
    next(err);
  }
};

// const getCar = async (req, res) => {
//   try {
//     const { carID } = req.params;
//     const conn = await getConnection();
//     const carResult = await conn.query(
//       "select carID,carName,carSeat from cars where carID = ? ",
//       carID
//     );
//     console.log(carResult);
//     res.status(200).json(carResult);
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };
// -------------------------------
const Register = async (req, res,next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { name, email, password, phone } = req.body;
    // if (carName === undefined || carSeat === undefined) {
    //   res.status(400).json({ message: "Bad Request. Please fill all field." });
    // }
    const admin = {
      name,
      email,
      password:hash,
      phone,
    };
    // console.log(carName);
    // console.log(carSeat);
    const conn = await getConnection();
    await conn.query(
      "insert into admins set ?",
      admin
    );
    res.status(201).json({ message: "Created Successfully" });
  } catch (err) {
    next(err)
  }
};
// -------------------------------
// const Register = async (req, res) => {
//   try {
//     const salt = 10;
//     const conn = await getConnection();
//     bcrypt.hash(req.body.password, salt, function (err, hash) {
//       conn.query(
//         'insert into admins (name, email, password, phone) values (?, ?, ?, ?)',
//         [req.body.name, req.body.email, hash, req.body.phone]
//       );
//     });
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };
// const updateCars = async (req, res) => {
//   try {
//     // console.log(req.params);
//     const { carID } = req.params;
//     const { carName, carSeat } = req.body;
//     if (carID === undefined || carName === undefined || carSeat === undefined) {
//       res.status(400).json({ message: "Bad Request. Please fill all field." });
//     }
//     const car = {
//       carName,
//       carSeat,
//     };
//     const conn = await getConnection();
//     await conn.query("update cars set ? where carID = ?", [car, carID]);
//     res.json({ message: "Update Successfully" });
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

// const deleteCars = async (req, res) => {
//   try {
//     // console.log(req.params);
//     const { carID } = req.params;
//     const conn = await getConnection();
//     await conn.query("delete from cars where carID = ?", carID);
//     res.json({ message: "Deleted Successfully" });
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

export const methods = {
  Register,
  login,
};
