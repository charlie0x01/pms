require("dotenv").config();
const { pool, transaction } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  constructor(UserID, FirstName, LastName, UserEmail, UserDOB, UserType, Password) {
    this.UserID = UserID;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.UserEmail = UserEmail;
    this.UserDOB = UserDOB;
    this.UserType = UserType;
    this.Password = Password;
  }

  save() {
    // create a query to register user in database
    let registerUser = `insert into users(user_id, first_name, last_name, user_email, user_dob, user_type, password) values(?, ?, ?, ?, ?, ?, ?); `;
    try {
      // encrypt password before saving in database
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(this.Password, salt, (error, hash) => {
          // create user and assign a wallet to the new user with init balance 0
          transaction(pool, async (connection) => {
            const result = await connection.execute(registerUser, [
              this.UserID,
              this.FirstName,
              this.LastName,
              this.UserEmail,
              this.UserDOB,
              this.UserType,
              hash,
            ]);
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
    let query = `select * from users where user_email = ?;`;
    return pool.execute(query, [emailID]);
  }

  static matchPassword(user, userPassword) {
    // compare the registered password with login password
    return bcrypt.compare(userPassword, user.password);
  }

  static getSignedToken(user) {
    return jwt.sign({ email: user.UserEmail }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  static getResetPasswordToken(user) {
    return jwt.sign({ email: user.UserEmail }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }
}

module.exports = User;
