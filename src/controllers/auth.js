const { users } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  const schema = Joi.object({
    fullname: Joi.string().min(5).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(4).required(),
    gender: Joi.string().min(3).required(),
    phone: Joi.string().min(6).required(),
    address: Joi.string().min(6).required()
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);   

    const newusers = await users.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      status: "users"
    });
    res.status(200).send({
      status: "success",
      data: {
        fullname: newusers.fullname,
        email: newusers.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    emailLogin: Joi.string().email().min(6).required(),
    passwordLogin: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body);
  console.log(error)
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const usersExist = await users.findOne({
      where: {
        email: req.body.emailLogin,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    
    const isValid = await bcrypt.compare(req.body.passwordLogin, usersExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "password is invalid",
      });
    }

    const token = jwt.sign({ id: usersExist.id,status:usersExist.status,fullname:usersExist.fullname }, process.env.TOKEN_RAHASIA);
    res.status(200).send({
        status: "success",
        data: {
         username: usersExist.fullname,
         token : token,
         status:usersExist.status,
         id:usersExist.id      
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Account is invalid",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.users.id;

    const datausers = await users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    console.log(datausers);

    if (!datausers) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        users: {
          id: datausers.id,
          fullname: datausers.fullname,
          email: datausers.email,
          phone: datausers.phone,
          gender: datausers.gender,
          address: datausers.address,
          status: datausers.status,
          photo: datausers.photo,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};