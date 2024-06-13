import pkg from 'lodash';
import User from "../model/users.model";


const { omit } = pkg;


export async function findUserByEmail(email) {
  return User.findOne({emailAddress: email});
}
export async function createUser(payload) {
  try {

   
     const user = await User.create(payload);
     return user
    
  

  } catch (error) {
    throw new Error(error);
  }
}
export async function validatePassword({
  emailAddress,
  password,
}) {
  const user = await User.findOne({ emailAddress }, '-__v -createdAt -updatedAt');

  if (!user) {
    return {error: 'No user found'};
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return {error: 'Invalid credentials'};
  }

  return omit(user.toJSON(), "password");
}
export async function findUser(query) {
  return User.findOne(query).lean();
}
export async function changePassword(userID, password){
  try {

    const { SALT } = config;
    const salt = await bcrypt.genSalt(parseInt(SALT));
    const hash = await bcrypt.hashSync(password, salt);
    console.log("hash",hash)
    var result = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(userID) }, 
      {"$set":{"password": hash}},
      { new: true }).exec();
    return result
  } catch(error){
    throw new Error(error)
  }
}

export const sendOtp = (userId ) => {
  return new Promise ( async (resolve, reject)  => {
        try {
         
          const user = await User.findOne({ _id :userId });
          if (user) {
            let otp = Math.floor(100000 + Math.random() * 900000);
            const userData = await User.findOneAndUpdate({_id:userId},{$set:{ otp: otp}}, {new: true});
           // await otpVerificationEmail(userData,otp)
            resolve({
              status: "success",
              message: "OTP sent",
            });
          } else {
            throw "No User Found";
          }
        } catch (error) {
          reject({ status: "fail", message: error });
        }
      
  });
};
export const verifyOtp = (userId, otp) => {
  return new Promise( async (resolve, reject) => {
        try {
          
          const user = await User.findOne({ _id :userId });          
          if (user) {
            if (user.otp == otp ) {
              let user = await User.findOneAndUpdate({_id:userId},{$set:{ otp: null,isEmailVerified: true,}}, {new: true});
              resolve({
                user:user,
                status: "success",
                message: "OTP Verified",
              });
            } else {
              throw "Wrong OTP";
            }
          } else {
            throw "No User Found";
          }
        } catch (error) {
          reject({
            status: "fail",
            message: error
          });
        }
  });
};
