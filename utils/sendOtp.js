const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  async function sendOTP(email, otp) {
    await sgMail.send({
      to: email,
      from: "vishal.j.khim@gmail.com", // same as verified
      subject: "EcoBin",
      html: `
          <h3>OTP Verification</h3>
          <p>Your OTP is: <b>${otp}</b></p>
          <p>Valid for 5 minutes</p>
        `,
    });
    console.log("Otp Sent");  
  }

  module.exports = sendOTP;