
const handler = async (req, res) => {
  if (req.method == "POST") {
    
    try{
        let pan=req.body.pan;
        console.log(pan)
        if(pan!=null && pan!= undefined){
            res.json({name:"bhnbnj" , pan:pan, cibil_score:"234"})
        }
        else
        {
            res.json({error: "Invalid"})
        }

    }
    catch(e){
        
            res.json({error: e})
    }
    
  } else {
    res.status(201).send({ error: "error method" });
  }
};
export default handler;
