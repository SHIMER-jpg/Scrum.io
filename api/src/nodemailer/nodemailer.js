const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "scrumio64@gmail.com", // generated ethereal user
      pass: "ngbmdymyqzgkzfhx", // generated ethereal password
    },
  });


  transporter.verify()
  .then(() => {
      console.log("listo para enviar mails")
  })



  module.exports={
    transporter: transporter
  }