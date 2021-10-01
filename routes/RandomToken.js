const router = require("express").Router();
const User = require("../models/User");

var authToken='bfd1840dfa71619e72417ba31f7ca7ce';
var account_sid='AC6b62318bc7f96a1f16424b2bc447bdac';
var twilio=require('twilio');
var client=new twilio(account_sid,authToken);

function sendSMS(tokenid,mobileNumber) {
  console.log("Inside SMS",tokenid)
  str1="+91"
  phone = str1.concat(mobileNumber)
  client.messages.create({
  body:`Your token Id for Online Tatkal Reservation is ${tokenid}`,
  to:`${phone}`,
  from:'+16892154007'
})
.then((message)=>console.log(message.sid)); 
}

router.get('/', async(req,res) => {
    try{
      console.log("IN Random Token")
      const userData = await User.aggregate([{ $sample: { size: 2 } }])
      console.log(userData)
      console.log(userData.length)
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