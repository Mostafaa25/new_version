import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';
import User from '../auth/userAuth/model/userModel.js';


const authMiddleware = async (req, res, next) => {console.log("aaaaaaaaaaaaaaaaaaaaa")
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('No token provided', 401));
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
    console.log(decoded)
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }
   console.log(user)
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Invalid or expired token', 401));
  }
};
const adminMiddleware = async (req, res, next) => {
     
  // Check if the user (from authMiddleware) has the admin role
  if (req.user.role !== "admin") {
    return next(new AppError('Access denied: Admin only', 403));
  }
  next();
};
export {
    authMiddleware , adminMiddleware
}