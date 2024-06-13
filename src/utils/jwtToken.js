import jwt from "jsonwebtoken";
import config from '../../enviorments';

const { SECRET } = config;

export function sign(object, options) {
  return jwt.sign(object, SECRET, options);
}

export function decode(token) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
}