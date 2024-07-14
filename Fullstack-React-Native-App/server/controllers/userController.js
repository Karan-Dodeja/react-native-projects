const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");
const { expressJWT: jwt } = require("express-jwt");
const userModal = require("../modals/useModal");

// middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

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
    // Toke JWT
    const token = await JWT.sign(
      {
        _id: exisitingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // decrypt token for middleware

    // Undefined Password
    exisitingUser.password = undefined;

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
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

const updateUserController = async () => {
  try {
    const { name, password, email } = req.body;
    const user = await userModal.findOne({ email });
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password id required and should be six characters",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { name: name || user.name, password: hashedPassword || user.password },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile updated , now login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user update api",
    });
  }
};

module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUserController,
};
