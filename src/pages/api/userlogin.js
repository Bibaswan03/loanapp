import User from "../../../model/User";
import conndb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    

    try {
      
        const u = await User.findOne({ email: req.body.email });

        if (u) {
          if (
            req.body.email == u.email &&
            req.body.password ==
              CryptoJS.AES.decrypt(
                u.password,
                process.env.CRYPTO_SECRET
              ).toString(CryptoJS.enc.Utf8)
          ) {
            var token = jwt.sign(
              { email: u.email, name: u.name },
              process.env.JWT_SECRET
            );
            res.status(200).json({ success: true, token });
          } else {
            res
              .status(400)
              .json({ success: false, error: "Invalid credentials" });
          }
        } else {
          res
            .status(400)
            .json({ success: false, error: "User not registered" });
        }
      
    } catch (e) {
      res.status(400).json({ login: false, data: "error occured" });
    }

    // const u = await User.findOne({ email: req.body.email });

    // if (u) {
    //   if (req.body.email == u.email && req.body.password == CryptoJS.AES.decrypt(u.password, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8)) {
    //     var token = jwt.sign({email: u.email, name: u.name }, process.env.JWT_SECRET);
    //     res.status(200).json({success: true,token});
    //   } else {
    //     res.status(400).json({ success: false, error: "Invalid credentials" });
    //   }
    // } else {
    //   res.status(400).json({ success: false, error: "User not registered" });
    // }
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);
