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

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [d.getFullYear(),pad(d.getMonth()+1),pad(d.getDate()), ].join('-')
}

const sampleSize = ([...arr], n) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};



router.get('/', async(req,res) => {
    try{
      const date = convertDate(new Date())
      console.log(date)
      const subData = await User.find({dateOfTravel:date})
      const userData = sampleSize(subData,2)
      for (let i = 0; i < userData.length; i++) {
        sendSMS(userData[i].tokenId,userData[i].mobileNumber)
      }
      res.status(200).send(userData)
    }
    catch(err){
      res.status(500).json(err)
    }
  })

  module.exports = router;