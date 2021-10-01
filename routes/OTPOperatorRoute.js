const router = require("express").Router();
const User = require("../models/User");

const crypto = require('crypto')
const authToken = "bfd1840dfa71619e72417ba31f7ca7ce"
const accountSid = "AC6b62318bc7f96a1f16424b2bc447bdac"
const client = require('twilio')(accountSid, authToken)
let refreshTokens = []

const JWT_AUTH_TOKEN = "4e749adfb13923ced102fdc0ba05252323d5393195513d03bb272fecf7afc3444c3e6f1aa4521dc8f6ee710ea6c360c2dc331303c42ae035548d8cdd58ff02a5"
const JWT_REFRESH_TOKEN = "beda107d2488e51dbacff4108bf480f56d5ce479a3f2e8bd2bbf849b27010b5f0a96ae6f33493a5db2f9bbfff2ef08191fe9bc6c0c4962eec2af35d6da38a76e"
const smsKey = "2d0bcaddbde6c19817c19a3ceab24b0c1a5e681817249dba27afd520f92d43e531163aba2011d366169fc9d29b214b63928bb52b22ba2f36607dbe84aa782a9e"

const {tokenVerifier} = require('./TokenUtils');
// router.post("/register", async (req, res) => {
//     try {
//       const newUser = new User(req.body);
//       console.log("/register request received:", newUser);

//       const user = await newUser.save();
//       res.status(200).json(user);
//     } catch (err) {
//       console.log("error", err);
//       res.status(500).json(err);
//     }
//   });

//   router.get('/', async(req,res) => {
//     const id = req.query.id
//     try{
//       const userData = await User.find({tokenId:id})
//       res.status(200).json(userData)
//     }
//     catch(err){
//       res.status(500).json(err)
//     }
//   })

router.post('/sendOTP', (req, resp) => {
    const phone = req.body.phone;
    const otp = Math.floor(100000 + Math.random() * 900000)
    const ttl = 2 * 60 * 1000
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`
    const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')
    const fullHash = `${hash}.${expires}`

    client.messages.create({
        body : `Your OTP for TATKAL RESERVATION is ${otp}`,
        from: '+16892154007',
        to : phone
    }).then((messages)=>{
        console.log(messages)

    }).catch((err)=> console.error(err))

    resp.status(200).send({ phone, hash: fullHash, otp })
})


router.post('/verifyOTP', (req, res) => {

    console.log(req.body);

    const phone = req.body.phone;
    const hash = req.body.hash;
    const otp = req.body.otp;
    let [hashValue, expires] = hash.split('.');

    let now = Date.now();
    if (now > parseInt(expires)) {
        return res.status(504).send({ msg: 'Timeout. Please try again' });
    }
    let data = `${phone}.${otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac('sha256', smsKey).update(data).digest('hex');
    if (newCalculatedHash === hashValue) {
        console.log('user confirmed');
        return res.status(202).send({ msg: 'Device verified' })
    } else {
        console.log('not authenticated');
        try {
            return res.status(400).send({ verification: false, msg: 'Incorrect OTP' });
        } catch (error) {
            console.log(error);

        }
    }
});

// To get all user data
router.get('/otpUserData', async (req, res) => {
    try {
        const token = await tokenVerifier(req.headers.token);
        const userData = await User.find({})
        if(token)
            res.status(200).json({'status': 'verified', 'email':token.email, 'userData':userData});
        else
            res.status(200).json({'status': 'invalid token'});
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})


// To update status of otpVerification on successfull verification of OTP
router.patch('/updateOtpVerification', async (req, res) => {
    try {
        console.log(req.body);
        User.update(
            {tokenId: req.body.tokenId}, 
            {$set: { otpVerification: true }}, 
            {upsert: false}, 
            function(err){
                if(err){
                    console.log(err);
                }
            }
        );
        res.status(200).json({})
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;