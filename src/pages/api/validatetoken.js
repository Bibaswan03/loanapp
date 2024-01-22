import User from "../../../model/User";
import conndb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const token = req.body.token;
    if (token) {
      // Verify the token using jwt.verify method
      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (decode) {
          res.status(201).json({ login: true, data: decode });
        } else {
          res.status(201).json({ login: false, data: "error token" });
        }
      } catch (e) {
        res.status(400).json({ login: false, data: "error occured" });
      }
    } else {
      res.status(500).json({ login: false, data: "error occured" });
    }
  } else {
    res.status(201).send({login:false, error: "error method" });
  }
};
export default conndb(handler);
