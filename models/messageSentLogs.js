const mongoose = require("mongoose");

const messageSentSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true
    },
    granted: {
        type: Boolean,
        required: true,
        default:false
      },
  },
  { timestamps: true },
  { collection: 'messagesents' }
);

module.exports = mongoose.model("messagesents", messageSentSchema);
