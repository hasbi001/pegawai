const db = require("../models");
const config = require("../config/auth");
const User = db.users;

// const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    }).then(data => {
        res.send({
            data:data,
            message: "User registered successfully!" 
        });
      })
      .catch(err => {
        res.status(500).send({
          data:{},  
          message:err.message || "Some error occurred while register data."
        });
      });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id },
                           config.secret,
                           {
                            algorithm: 'HS256',
                            allowInsecureKeySizes: true,
                            expiresIn: 86400, // 24 hours
                           });

    req.session.token = token;

    return res.status(200).send({
      status:200,
      id: user.id,
      username: user.username,
      email: user.email,
      token: token
    });
  } catch (error) {
    return res.status(500).send({ status:400, message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      status: true,
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};