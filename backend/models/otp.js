require("dotenv").config();
const { pool, transaction } = require("../config/database");

class OTP {
  constructor(UserEmail, Code) {
    this.UserEmail = UserEmail;
    this.Code = Code;
  }

  save() {
    // create a query to save otp in table
    let saveOTP = `insert into otp(user_email, otp_code) values(?, ?); `;
    try {
      transaction(pool, async (connection) => {
        const result = await connection.execute(saveOTP, [
          this.UserEmail,
          this.Code,
        ]);
      });
    } catch (error) {
      throw error;
    }
  }

  static updateOTP(email, newOTP) {
    // update user password in database
    let updateOTP = `update otp set otp_code = ? where user_email = ? `;
    try {
      transaction(pool, async (connection) => {
        await connection.execute(updateOTP, [newOTP, email]);
      });
    } catch (error) {
      throw error;
    }
  }

  static findByEmailId(emailID) {
    let query = `select * from otp where user_email = ?;`;
    return pool.execute(query, [emailID]);
  }

  static findByOTP(otpCode) {
    let query = `select * from otp where otp_code = ?;`;
    return pool.execute(query, [otpCode]);
  }
}

module.exports = OTP;
