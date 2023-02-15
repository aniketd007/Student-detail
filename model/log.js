const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stud = new Schema({
  email: String,
  pwd: String,
  pid:{
    type: Schema.Types.ObjectId,
        ref: "personal"
  }
});

const Stud = mongoose.model('stud',stud);
module.exports=Stud; 