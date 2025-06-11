import { catchAsync } from '../../../utils/CatchAsync.js';
import * as coachService from '../Service/coachService.js';

export const coachregister = catchAsync(async (req, res) => {
  const token = await coachService.coachregister(req.body);
  return res.status(201).json({
    success: true,
    message: 'Coach registered successfully',
    token,
  });
});

export const coachlogin = catchAsync(async (req, res) => {
  const token = await coachService.coachlogin(req.body.email, req.body.password);
  return res.status(200).json({
    success: true,
    message: 'Coach logged in successfully',
    token,
  });
});

export const coachLogout = catchAsync(async (req, res) => {
  await coachService.coachLogout(req.user._id);
  return res.status(200).json({
    success: true,
    message: 'Coach logged out successfully',
  });
});

export const searchCoaches = catchAsync(async (req, res) => {
  const { name } = req.query;
  const coaches = await coachService.searchCoaches(name);
  return res.status(200).json({
    success: true,
    data: coaches,
    count: coaches.length,
  });
});

export const registerCoach = catchAsync(async (req, res) => {
  const coach = await coachService.coachRegister(req.body);
  return res.status(201).json({
    success: true,
    data: coach,
  });
});

export const getCoach = catchAsync(async (req, res) => {
  const coach = await coachService.getCoachProfile(req.params.id);
  return res.status(200).json({
    success: true,
    data: coach,
  });
});

export const getContact = catchAsync(async (req, res) => {
  const contact = await coachService.getCoachContact(req.params.id);
  return res.status(200).json({
    success: true,
    data: contact,
  });
});

export const updateSelfProfile = catchAsync(async (req, res, next) => {
  const loggedInUserId = req.user.id;
  const role = req.user.role;

  if (role !== 'coach') {
    return next(new AppError('Only coaches can access this route', 403));
  }

  const updatedCoach = await coachService.updateCoachProfile(loggedInUserId, req.body);

  res.status(200).json({
    success: true,
    data: updatedCoach,
  });
});

export const deleteCoach = catchAsync(async (req, res) => {
  await coachService.deleteCoachProfile(req.params.id);
  return res.status(200).json({
    success: true,
    message: 'Coach deleted successfully',
  });
});

export const verifyCoach = catchAsync(async (req, res) => {
  const coach = await coachService.verifyCoach(req.params.id);
  return res.status(200).json({
    success: true,
    data: coach,
  });
});

export const getCoachProfile = async (req, res) => {
  const { coachId } = req.params;

  try {
    const profile = await coachService.fetchCoachProfile(coachId);
    res.status(200).json(profile);
  } catch (err) {
    if (err.message === 'CoachNotFound') {
      return res.status(404).json({ message: 'Coach not found' });
    }
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export const getAllCoaches = async (req, res, next) => {
  try {
    const coaches = await coachService.fetchUnverifiedCoaches();
    res.status(200).json({
      status: 'success',
      data: coaches
    });
  } catch (err) {
    next(err); 
  }
};

 export const getcoachProfile = async (req, res, next) => {
  try {
    // Your authMiddleware already attached req.user
    console.log("we are in controller and user  is " + req.user)
    const coachid = await coachService.getCoachProfileByUserId(req.user._id)
    const profile = await coachService.fetchCoachProfile(coachid);
    res.status(200).json(profile);
  } catch (error) {
    next(error); // Forward to your global error handler
  }
};


