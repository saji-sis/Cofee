const mongoose = require("mongoose");
require("./Product"); //چون میخواهیم به مدل محصول وصل شویم باید اول امیپورتش کنیم

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAccept: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false,
  },
  productID: {
    //چون هرکامنت مختص یک محصول هست،پس رابطه یک به یک هستش
    type: mongoose.Types.ObjectId,
    ref: "Product", //به مدل محصول رفرنس میدهیم برای اتصال
  },
});

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

export default model;
