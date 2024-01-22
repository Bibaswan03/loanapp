import User from "../../../model/User";
import conndb from "../../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const auth = req.headers["authorization"];
    // console.log(auth)
    const bearer = auth.split(" ");
    const token = bearer[1] || " ";
    // console.log(token);

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      if (decode) {
        const pan=req.body.pan
        console.log(pan);
        
        let response = await fetch(`http:localhost:3000/api/dummyapi`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ pan: pan }),
          });
        let data= await response.json()
        console.log(data)
        res.send("Success")
        
      } else {
        res.status(201).json({ login: false, data: "error token" });
      }
    } catch (e) {
      res.status(400).json({ login: false, data: "error occured" });
    }

  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default conndb(handler);
