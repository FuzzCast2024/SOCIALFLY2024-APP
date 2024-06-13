import log from "../utils/logger";
import { sign } from "../utils/jwtToken";
import mongoose from "mongoose";
import {
  createUser,
  findUser,
  validatePassword,
  findUserByEmail,
  changePassword,
  sendOtp,
  verifyOtp,
} from "../services/user.service";
import User from "../model/users.model";



// Register user
export async function CreateUserHandler(req, res) {
  try {
    const payload = req.body;
    const emailPresent = await findUser({ emailAddress: payload.emailAddress });

    if (emailPresent) {
      return res.status(403).json({
        err: 'User already exists with this email address',
        statusCode: 2
      });
    }

    const userData = await createUser(payload);

    return res.status(200).json({
      ...userData,
      statusCode: 1,
      statusDesc: "signed up successfully.",
    });
  } catch (e) {
    log.error(e);
    return res.status(409).json({
      statusCode: 0,
      statusDesc: "error occurred while saving user details."
    });
  }
}

export async function updateUser(req, res) {
  try {
    const payload = req.body;
    if (!payload._id) {
      return res.status(400).send({
        statusCode: 0,
        statusDesc: "Please provide all required fields.",
      });
    }
    const userId = payload._id;
    let result = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userId) },
      payload,
      { new: true }
    )
    return res.status(200).send({
      data: result,
      statusCode: 1,
      statusDesc: "User updated successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message || error,
      statusCode: 0,
      statusDesc: "Error occurred while updating User.",
    });
  }
}

// Login user
export async function LoginUser(req, res) {
  try {
    const { emailAddress, password } = req.body;
    const emailPresent = await findUser({ emailAddress: emailAddress });

    if (emailPresent) {
      const user = await validatePassword({ emailAddress, password });

      if (user.hasOwnProperty('error')) {
        return res.status(400).json({
          statusCode: 0,
          statusDesc: "user with this email does not exist.",
        });
      } else {
        const token = sign({ _id: user._id });
        const result = { ...user };
        const cookieOptions = {
          expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        };

        result.token = token;
        result.expires = cookieOptions;

        return res.status(200).json({
          ...result,
          statusCode: 1,
          statusDesc: "signed in successfully.",
        });
      }
    } else {
      return res.status(400).json({
        statusCode: 0,
        statusDesc: "user with this email does not exist.",
      });
    }
  } catch (e) {
    log.error(e);
    res.status(400).json({
      error: e.message,
      statusCode: 0,
      statusDesc: "error occurred."
    });
  }
}

// Forgot password
export async function ForgotPassword(req, res) {
  try {
    const { emailAddress } = req.body;
    const user = await findUserByEmail(emailAddress);
   // sendPasswordRecoveryEmail(user);

    return res.status(200).send({
      statusCode: 1,
      statusDesc:
        "You would receive an email with a password recovery link shortly.",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message || error,
      statusCode: 0,
      statusDesc: "Error occurred.",
    });
  }
}

// Change password
export async function ChangePassword(req, res) {
  try {
    const { password, _id } = req.body;
    await changePassword(_id, password);


    res.send({
      statusCode: 1,
      statusDesc: "Password changed successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message || error,
      statusCode: 0,
      statusDesc: "Error occurred.",
    });
  }
}


// Send Otp
export async function SendOtp(req, res) {
  const { userId } = req.body;
  try {
    let db = await sendOtp(userId);
    return res.status(200).send({
      statusCode: 1,
      statusDesc: "OTP sent successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message || error,
      statusCode: 0,
      statusDesc: "Error occurred.",
    });
  }
}

// Verify Otp
export async function VerifyOtp(req, res) {
  try {
    const { userId, otp } = req.body;
    let db = await verifyOtp(userId, otp);
    return res.status(200).send({
      data: db,
      statusCode: 1,
      statusDesc: "OTP verified successfully.",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message || error,
      statusCode: 0,
      statusDesc: "Error occurred.",
    });
  }
}