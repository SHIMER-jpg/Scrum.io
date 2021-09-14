const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "scrumio64@gmail.com", 
      pass: "ngbmdymyqzgkzfhx", 
    },
  });


  transporter.verify()
  .then(() => {
      console.log("listo para enviar mails")
  })



  module.exports={
    transporter: transporter
  }