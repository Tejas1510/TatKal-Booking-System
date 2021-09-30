const router = require("express").Router();
const RailwayOperator = require("../models/RailwayOperator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenVerifier = async (token) => {
    const tokenKey = 'token';
    try{
        const decoded = jwt.verify(token, tokenKey);
        const operator = await RailwayOperator.findOne({email: decoded.email});
        if(operator && operator.token.includes(token)){
            return(decoded);
        }
        return(null);
    }
    catch{
        return(null);
    }
}

module.exports = {
    tokenVerifier: tokenVerifier
};