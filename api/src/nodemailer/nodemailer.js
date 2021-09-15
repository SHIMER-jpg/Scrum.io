const nodemailer = require("nodemailer");
require ("dotenv").config()




const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD_MAIL, 
    },
  });



  transporter.verify()
  .then(() => {
      console.log("listo para enviar mails")
  })



  module.exports={
    transporter: transporter
  }