const mongoose = require("mongoose");

const RailwayOperatorSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: Array,
            required: true,
        },
        privileges: {
            type: Array,
            required: true,
        }
    },
    { timestamps: true },
    { collection: 'railwayoperators' }
);

module.exports = mongoose.model("railwayoperators", RailwayOperatorSchema);
