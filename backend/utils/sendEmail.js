const nodemailer = require("nodemailer");

function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "T-";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function sendEmail(email, name, otp, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "taskify90@gmail.com", // Your email id ( sender's email )
      pass: "gpwiskifkdcddrin", // Your password
    },
  });

  const mailOptions = {
    from: "taskify90@gmail.com",
    to: email,
    subject: `${message}`,
    text: `Hi ${name},
    Your ${message} , use the following OTP
          
          ${otp}
    
    If you did not request a password change or email verification code, please feel free to ignore this message.
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

function sendInvitaionEmail(
  email,
  invitedTo,
  invitedBy,
  joininCode,
  joinTo,
  res
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "taskify90@gmail.com", // Your email id ( sender's email )
      pass: "gpwiskifkdcddrin", // Your password
    },
  });

  const mailOptions = {
    from: "taskify90@gmail.com",
    to: email,
    subject: `Taskify Invitation by ${invitedBy}`,
    text: `${invitedTo},
    I’d like to invite you to join the ${joinTo} at Taskify to keep track of the work we do together.

    Use this joining code ${joininCode} to join.

    Using this online project management system, you’ll keep track of our work, collaborate with our other team members, and stay up to date with projects. It gives a real-time view and is a great way to remain in sync

    If you want to create an account, please click on the following link: http://localhost:5173/signup
    Otherwise Sign In http://localhost:5173/signin
    `,
    // html: '<p>You requested for reset password, kindly use this <a href="http://localhost:5000/reset-password?token=' + token + '">link</a> to reset your password</p>'
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      res.json({
        success: false,
        message: "could not sent invitation email due to some problems.",
      });
    } else {
      res.json({ success: true, message: info.response });
    }
  });
}

function sendNotificationEmail(email, subject, body, res) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "taskify90@gmail.com", // Your email id ( sender's email )
      pass: "gpwiskifkdcddrin", // Your password
    },
  });

  const mailOptions = {
    from: "taskify90@gmail.com",
    to: email,
    subject: subject,
    text: body,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      res.json({
        success: false,
        message: "could not sent invitation email due to some problems.",
      });
    } else {
      res.json({ success: true, message: info.response });
    }
  });
}
module.exports = {
  sendEmail,
  generateOTP,
  sendInvitaionEmail,
  sendNotificationEmail,
};
