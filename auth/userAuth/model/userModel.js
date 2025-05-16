import mongoose from 'mongoose';

export const enumRole = {
  user: 'user',
  coach: 'coach',
  admin: 'admin',
};

export const enumStatus = {
  pending: 'pending',
  approved: 'approved',
};

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [15, "Username must be at most 15 characters long"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    sparse: true,
    match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'],
  },
  age: {
    type: Number,
    min: 10,
    max: 100,
  },
  weight: {
    type: Number,
    min: 20,
  },
  height: {
    type: Number,
    min: 50,
  },
  goal: {
    type: String,
    enum: ['lose', 'gain', 'maintain'], 
  },
  workout_days: {
    type: Number,
    min: 1,
    max: 7,
  },
  role: {
    type: String,
    enum: Object.values(enumRole),
    default: enumRole.user,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
