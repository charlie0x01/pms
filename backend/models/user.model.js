require("dotenv").config();
const { pool, transaction } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  constructor(FirstName, LastName, Email, Password) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.UserEmail = Email;
    this.Password = Password;
  }

  save(verificationCode) {
    // create a query to register user in database
    let registerUser = `insert into users(first_name, last_name, email, dob, user_type, password, verified, verificationCode) values(?, ?, ?, NULL,NULL, ?, 0, ?); `;
    try {
      // encrypt password before saving in database
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(this.Password, salt, (error, hash) => {
          transaction(pool, async (connection) => {
            const result = await connection.execute(registerUser, [
              this.FirstName,
              this.LastName,
              this.UserEmail,
              hash,
              verificationCode,
            ]);
          });
        });
      });
    } catch (error) {
      throw error;
    }
  }

  static updatePassword(email, newPassword) {
    // update user password in database
    let updatePass = `update users set password = ? where email = ?;`;
    let setOTPEmtpy = `update users set forget_pass_otp = "" where email = ?;`;
    try {
      // encrypt password before saving in database
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newPassword, salt, (error, hash) => {
          transaction(pool, async (connection) => {
            await connection.execute(updatePass, [hash, email]);
            await connection.execute(setOTPEmtpy, [email]);
          });
        });
      });
    } catch (error) {
      throw error;
    }
  }

  static findAll() {
    let query = `select * from users;`;
    return pool.execute(query);
  }

  static findByEmailId(emailID) {
    let query = `select * from users where email = ?;`;
    return pool.execute(query, [emailID]);
  }
  static findByUserId(userId) {
    let query = `select * from users where user_id = ?;`;
    return pool.execute(query, [userId]);
  }

  static findByVerificationCode(verificationCode) {
    try {
      let query = `select * from users where verificationCode = ?;`;
      return pool.execute(query, [verificationCode]);
    } catch (error) {
      throw error;
    }
  }

  static findByName(projectTitle) {
    let findByName = `select * from projects where project_title = ? ;`;
    return pool.execute(findByName, [projectTitle]);
  }

  static matchPassword(user, userPassword) {
    // compare the registered password with login password
    return bcrypt.compare(userPassword, user.password);
  }

  static setUserVerificationStatus(verified, verificationCode) {
    try {
      let query = `update users set verified = ? where verificationCode = ?;`;
      pool.execute(query, [verified, verificationCode]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async newVerificationCode(verificationCode, email) {
    try {
      let query = `update users set verificationCode = ? where email = ?;`;
      return await pool.execute(query, [verificationCode, email]);
    } catch (error) {
      throw error;
    }
  }

  static async forgetPasswordOTP(otp, email) {
    let query = `update users set forget_pass_otp = ? where email = ?;`;
    return await pool.execute(query, [otp, email]);
  }

  static getSignedToken(email) {
    return jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  static getResetPasswordOTP(user) {
    return jwt.sign({ email: user.user_email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  // FOR TASKS
  static findByUserId(userId) {
    let query = `select * from users where user_id = ?;`;
    return pool.execute(query, [userId]);
  }
}

module.exports = User;
