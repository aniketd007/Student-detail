const log = require('../model/log');
const personal = require('../model/personal');
const bcrypt = require('bcrypt');
const nodemailer  = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main(mail) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'swarniminfotech25@gmail.com', // generated ethereal user
      pass: 'qmqrukrzzpxxwloo', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'swarniminfotech25@gmail.com', // sender address
    to: mail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

exports.Login = async function (req, res, next) {
    try {
        let mail = await log.findOne({ email: req.body.email });
        if (!mail) {
            throw new Error("User Not Found");
        }
        console.log(req.body);
        let checkpass = await bcrypt.compare(req.body.pwd, mail.pwd)
        if (!checkpass) {
            throw new Error("Password Is Wrong");
        }
        res.status(200).json({
            status: "Success",
            message: "User Login Successful",
            data: mail
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.signUp = async function (req, res, next) {
    try {
        console.log(req.body);
        if ((!req.body.pwd || !req.body.cpwd) | req.body.pwd != req.body.cpwd) {
            throw new Error("Password And Confirm Password Must Be Same")
        }
        req.body.pwd = await bcrypt.hash(req.body.pwd, 10)
        let record = await log.create(req.body);
        await main(req.body.email);
        res.status(200).json({
            status: "Success",
            message: "Insert Successful",
            data: record
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.insert = async function (req, res, next) {
    try {
        console.log(req.body);
        console.log(req.file.filename);
        req.body.image = req.file.filename
        let record = await personal.create(req.body);
        res.status(200).json({
            status: "Success",
            message: "Insert Successful",
            data: record
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.singleView = async function (req, res, next) {
    try {
        console.log(req.body);
        let id = req.query.id;
        let record = await log.findById(id).populate('pid');
        res.status(200).json({
            status: "Success",
            message: "View Successful",
            data: record
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.allView = async function (req, res, next) {
    try {
        console.log(req.body);
        let id = req.body.id;
        let record = await log.find().populate('pid');
        res.status(200).json({
            status: "Success",
            message: "View Successful",
            data: record
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}