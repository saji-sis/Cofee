const mongoose = require("mongoose");
require("./Comment"); //چون رابطه میخوایم بزنیم به این مدل ،باید ایمپورتش کنیم

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  suitableFor: {
    type: String,
    required: true,
  },
  smell: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 5,
  },
  tags: {
    type: [String],
    required: true,
  },
  comments: {
    //رابطه به شکلی هست که چندین کامنت میشه گرفت ،یعنی رابطه یک به چند
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment", // به مدل کامنتها رفرنس میدهیم
      },
    ],
  },
});

const model = mongoose.models.Product || mongoose.model("Product", schema);

export default model;
