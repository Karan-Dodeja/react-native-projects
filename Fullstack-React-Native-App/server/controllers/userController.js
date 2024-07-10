const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModal = require("../modals/useModal");
// register
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is req",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is req",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "password is req",
      });
    }

    // hash
    const hashPassword = await hashPassword(password);
    // user
    const exisitingUser = await userModal.findOne({
      email: email,
    });
    if (exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "User Exists with email",
      });
    }
    // save
    const user = await userModal({
      name,
      email,
      password: hashPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "Registration Successful now login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in registration.",
      error,
    });
  }
};

// Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email) {
      return res.status(500).send({
        success: false,
        message: "email is req",
      });
    }
    if (!password || password.length < 6) {
      return res.status(500).send({
        success: false,
        message: "password is req",
      });
    }

    // user
    const exisitingUser = await userModal.findOne({
      email: email,
    });
    if (!exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }

    // Math password
    const match = await comparePassword(password, exisitingUser.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      exisitingUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in registration.",
      error,
    });
  }
};

module.exports = { registerController, loginController };
