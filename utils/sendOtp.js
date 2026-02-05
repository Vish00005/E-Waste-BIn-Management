const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  async function sendOTP(email, otp) {
    await transporter.sendMail({
      from: `E-Waste Management`,
      to: email,
      subject: "Your Recycling OTP",
      html: `
          <h3>OTP Verification</h3>
          <p>Your OTP is: <b>${otp}</b></p>
          <p>Valid for 5 minutes</p>
        `,
    });
    console.log("Otp Sent");  
  }

  module.exports = sendOTP;