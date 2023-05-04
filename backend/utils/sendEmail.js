const nodemailer = require("nodemailer");

function sendEmail(email, name, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "", // Your email id ( sender's email )
      pass: "" // Your password
    }
  });

  const mailOptions = {
    from: "hamzakh827@gmail.com",
    to: email,
    subject: "Reset Your PMS Password",
    text: `Hi ${name},
    To set up a new password to your PMS account, use the following OTP
          
          ${otp}
    
    If you did not request a password change, please feel free to ignore this message.
    If you have any comments or questions don&#8217;t hesitate to reach us at [ organization email or any portal for help ]`,
    // html: '<p>You requested for reset password, kindly use this <a href="http://localhost:5000/reset-password?token=' + token + '">link</a> to reset your password</p>'
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent: " + info.response);
    }
  });
}

module.exports = sendEmail;
