const router = require("express").Router();
const User = require("../models/User");

var authToken='7ca186fbd3af70ecb3d8cfd4a7271f81';
var account_sid='ACcac49ea77ef74d9da4dd56fc219ccb27';
var twilio=require('twilio');
var client=new twilio(account_sid,authToken);

function sendSMS(tokenid,mobileNumber) {
  console.log("Inside SMS",tokenid)
  str1="+91"
  phone = str1.concat(mobileNumber)
  client.messages.create({
  body:`Your token Id for Online Tatkal Reservation is ${tokenid}`,
  to:`${phone}`,
  from:'+12145062843'
})
.then((message)=>console.log(message.sid)); 
}

router.get('/', async(req,res) => {
    try{
      const userData = await User.aggregate([{ $sample: { size: 2 } }])
      for (let i = 0; i < userData.length; i++) {
        if(userData[i].selectedUser===false){
          sendSMS(userData[i].tokenId,userData[i].mobileNumber
            )
          userData[i].selectedUser=true;
        }
      }
      res.status(200).send(userData)
    }
    catch(err){
      res.status(500).json(err)
    }
  })

  module.exports = router;