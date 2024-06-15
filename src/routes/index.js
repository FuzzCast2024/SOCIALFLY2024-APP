
import {
  CreateUserHandler,
  LoginUser,
  SendOtp,
  VerifyOtp,
  ForgotPassword,
  ChangePassword,
  updateUser
} from '../controller/user.controller';

import {
  registerUserValidators,
  loginValidators
} from "../validators/validators";
import { ValidateRequestBody } from "../utils/validation";


export default function (app) {

  app.get("/", (req, res) => {
    res.sendStatus(200)
  }); 
app.post("/api/signup", ...registerUserValidators, CreateUserHandler);
app.post("/api/login", ...loginValidators, ValidateRequestBody, LoginUser);
app.post("/api/send-otp", SendOtp);
app.post("/api/verify-otp", VerifyOtp);
app.post("/api/forgot-password", ForgotPassword);
app.post("/api/change-password", ChangePassword);
app.post("/api/update-user", updateUser);
 }