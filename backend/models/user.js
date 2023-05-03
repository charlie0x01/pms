require("dotenv").config();
const { pool, transaction } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  constructor(UserID, FirstName, LastName, UserEmail, Password) {
    this.UserID = UserID;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.UserEmail = UserEmail;
    this.Password = Password;
  }

  save() {
    // create a query to register user in database
    let registerUser = `insert into users(UserID, FirstName, LastName, UserEmail, Password) values(?, ?, ?, ?, ?); `;
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
    let query = `select * from users where UserEmail = ?;`;
    return pool.execute(query, [emailID]);
  }

  static matchPassword(user, userPassword) {
    // compare the registered password with login password
    return bcrypt.compare(userPassword, user.Password);
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
