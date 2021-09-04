const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNumber:{
        type:Number,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    sourceStation: {
        type: String,
        required: true,
    },
    destinationStation: {
        type: String,
        required: true,
    },
    boardingStation: {
        type: String,
        required: true,
    },
    reservationUpTo: {
        type: String,
        required: true,
    },
    aadharNumber: {
        type: String,
        required: true,
        unique:true,
    },
    prefernceTrain:{
        train1: { type: String },
        train2: { type: String },
        train3: { type: String },
        allTrain: { type: Boolean }
    },
    prefernceClass:{
        class1: { type: String },
        class2: { type: String },
        class3: { type: String },
        allClass: { type: Boolean }
    },
    passengerDetail:[
        {
            name:{ type: String },
            age:{ type: String },
            gender:{ type: String },
            birth:{type:String}
        }
    ],
    childrenDetail:[
        {
            name:{ type: String },
            age:{ type: String },
            gender:{ type: String },
        }
    ],
    signature:{
        type:String,
        required: true
    },
    tokenId:{
        type:String,
    },
    dateOfTravel:{
        type:String
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
