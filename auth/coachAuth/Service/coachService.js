import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { AppError } from '../../../utils/AppError.js';
import { generateToken } from '../../../utils/GenerateToken.js';
import * as coachRepo from '../Repo/coachRepo.js';
import * as userRepo from '../../userAuth/repo/userAuthRepo.js';
import { enumRole } from '../../../auth/userAuth/model/userModel.js';

export const coachregister = async (data) => {
  const { userName, email, password, Cpassword, cv, fees, phoneNumber } = data;

  if (password !== Cpassword) {
    throw new AppError('Passwords do not match', 400);
  }

  const existingUser = await userRepo.findUser({ email });
  if (existingUser) {
    throw new AppError('Coach already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const coachId = new mongoose.Types.ObjectId();

  const userData = {
    _id: coachId,
    userName,
    email,
    password: hashedPassword,
    role: enumRole.coach,
  };

  const coachData = {
    userId: coachId,
    cv,
    fees,
    phoneNumber,
  };

  const token = generateToken({ email: userData.email, id: coachId });

  await Promise.all([
    userRepo.saveuser(userData),
    coachRepo.savecoach(coachData),
  ]);

  return token;
};

export const coachlogin = async (email, password) => {
  const user = await userRepo.findUser({ email });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken({ email: user.email, id: user._id });
  return token;
};

export const coachLogout = async (userId) => {
  const user = await userRepo.findUser({ _id: userId });
  if (!user) {
    throw new AppError('User not found', 404);
  }
  
  // Clear the token field if it exists
  if (user.token) {
    user.token = undefined;
    await userRepo.saveuser(user);
  }
  
  return true;
};

export const coachRegister = async (data) => {
  const existingCoach = await coachRepo.findCoachByUserId(data.userId);
  if (existingCoach) {
    throw new AppError('User is already a coach', 400);
  }
  return await coachRepo.createCoach(data);
};

export const getCoachProfile = async (coachId) => {
  const coach = await coachRepo.findCoachById(coachId);
  if (!coach) {
    throw new AppError('Coach not found', 404);
  }
  return coach;
};

export const getCoachContact = async (coachId) => {
  const coach = await coachRepo.findCoachById(coachId);
  if (!coach) {
    throw new AppError('Coach not found', 404);
  }
  if (coach.isVerified !== true) {
    return {message : "This coach has not yet been approved by admin."}
  }
  return {
    phoneNumber: coach.phoneNumber,
    whatsappLink: coach.generateWhatsappLink('Hello coach'),
  };
};

export const updateCoachProfile = async (userId, data) => {
  const coach = await coachRepo.findCoachByUserId(userId);

  if (!coach) {
    throw new AppError('Coach not found', 404);
  }

  const updatedCoach = await coachRepo.updateCoach(coach._id, data);
  return updatedCoach;
};


export const deleteCoachProfile = async (coachId) => {
  const coach = await coachRepo.deleteCoach(coachId);
  if (!coach) {
    throw new AppError('Coach not found', 404);
  }
  return coach;
};

export const verifyCoach = async (coachId) => {
  const coach = await coachRepo.updateCoach(coachId, { isVerified: true });
  if (!coach) {
    throw new AppError('Coach not found', 404);
  }
  return coach;
};

export const searchCoaches = async (name) => {
  return await coachRepo.searchCoachesByName(name);
};

export const getVerifiedCoaches = async () => {
  return await coachRepo.listVerifiedCoaches();
};

export const fetchCoachProfile = async (coachId) => {
  const coach = await coachRepo.getCoachById(coachId);
  if (!coach) {
    throw new Error('CoachNotFound');
  }
  return {
    userName: coach.userId.userName,
    email: coach.userId.email,
    phoneNumber: coach.phoneNumber,
    isVerified: coach.isVerified,
    fees: coach.fees,
    cv: coach.cv
  };
};

export const fetchUnverifiedCoaches = async () => {
   const coaches = await coachRepo.find_NotVerified_Coaches();
   return coaches
};

/*export  const getcoachProfile = async (userId) => {
  const coach = await coachRepo.findCoachById(userId);
  
  if (!coach) {
    throw new AppError('Coach not found', 404);
  }

  if (!coach.verified) {
    throw new AppError('Account pending verification', 403);
  }

  return coach;
};*/

export async function getCoachProfileByUserId(userId) {
  const coach = await coachRepo.findCoachByUserId(userId);

  if (!coach) {
    throw new Error('No coach found with this user ID');
  }

  return coach;
}



