const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
    try {
      const newUser = new User(req.body);
      console.log("/register request received:", newUser);

      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      console.log("error", err);
      res.status(500).json(err);
    }
  });

  router.get('/', async(req,res) => {
    const id = req.query.id
    try{
      const userData = await User.find({tokenId:id})
      res.status(200).json(userData)
    }
    catch(err){
      res.status(500).json(err)
    }
  })
  

  module.exports = router;