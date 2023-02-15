const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personal = new Schema({
  name:String,
  image:String,
  dob:String,
  mono:String,
  add:String
});

const per = mongoose.model('personal',personal);
module.exports=per;