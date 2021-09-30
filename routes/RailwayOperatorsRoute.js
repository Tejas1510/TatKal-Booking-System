const router = require("express").Router();
const RailwayOperator = require("../models/RailwayOperator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {tokenVerifier} = require('./TokenUtils');

//const createRailwayOperator = 

router.post("/registerRailwayOperator", async (req, res) => {
    try {
        const newOperator = new RailwayOperator(req.body);
        const hashedPassword = await bcrypt.hash(newOperator.password, 12);
        newOperator.password = hashedPassword;
        const operator = await newOperator.save();
        res.status(200).json(newOperator);
    } catch (err) {
        console.log("error", err);
        res.status(500).json(err);
    }
});


router.post("/loginRailwayOperator", async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await RailwayOperator.findOne({ email });
        console.log(user);
        const comparePass = await bcrypt.compare(password, user.password);
        if (comparePass === true) {
            const token = await jwt.sign(
                { email: email }
                , 'token',
                {
                    expiresIn: "2d",
                }
            );
            //process.env.TOKEN_KEY            
            user.token.push(token);
            await user.save();
            console.log("Token:", token);
            res.status(200).json({ 'status': 'verified', 'token': token});
        }
        else {
            res.status(200).json({ 'status': 'not_verified' });
        }

    } catch (err) {
        console.log("error", err);
        res.status(500).json(err);
    }
});


router.post("/logoutRailwayOperator", async (req, res) => {
    try {
        console.log(req.body);
        const { email,token } = req.body;
        const user = await RailwayOperator.findOne({ email });
        console.log(user);

        if(user){
            user.token = user.token.filter(e => e !== token);
            user.save();
            res.status(200).json({ 'status': 'logged out', 'token': token});
        }
        else {
            res.status(200).json({ 'status': 'not logged out' });
        }

    } catch (err) {
        console.log("error", err);
        res.status(500).json(err);
    }
});

router.post("/authenticateRailwayOperator", async (req, res) => {
    try {
        const decoded = await tokenVerifier(req.headers.token);
        if(decoded)
            res.status(200).json({'status': 'verified', 'email': decoded.email});
        else
            res.status(200).json({ 'status': 'not verified'});
    } catch (err) {
        console.log("error", err);
        res.status(500).json(err);
    }
});

module.exports = router;