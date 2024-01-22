import User from "../../../model/User";
import conndb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method == "POST") {
    const auth=req.headers['authorization']
    console.log(auth)
    try {
      const { name, email, phone , pan} = req.body;

      const p = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_SECRET).toString();
      const u = new User({
        name: name,
        email: email,
        phone: phone,
        password: p,
        pan_no : pan
      });

      const u1 = await u.save();
      res.status(201).send(u1);
    } catch (error) {
      res.status(400).send({ error: "erreor" });
    }
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);