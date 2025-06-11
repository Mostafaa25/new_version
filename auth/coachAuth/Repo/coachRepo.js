import Coach from '../Model/coachModel.js';

export const createCoach = async (data) => {
  return await Coach.create(data);
};

export const findCoachById = async (id) => {console.log(id)
  return await Coach.findById(id);
};

export const updateCoach = async (id, data) => {
  return await Coach.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true 
  });
};


export const deleteCoach = async (id) => {
  return await Coach.findByIdAndDelete(id).lean();
};

export const listVerifiedCoaches = async () => {
  return await Coach.find({ isVerified: true }).lean();
};

export const searchCoachesByName = async (name) => {console.log(name)
  const coaches = await Coach.find()
    .populate({
      path: 'userId',
      match: { userName: { $regex: name, $options: 'i' } },
      select: 'userName email',
    })
    .lean();
  return coaches.filter((coach) => coach.userId !== null);
};

export const savecoach = async (coachData) => {
  const newCoach = new Coach(coachData);
  return await newCoach.save();
};

export const getCoachById = async (coachId) => {
  console.log(coachId);
  return await Coach.findById(coachId).populate('userId', 'userName email');
};


export const findCoachByUserId = async (userId) => {
  return await Coach.findOne({ userId });
};


export const find_NotVerified_Coaches = async () => {
  return await Coach.find({ isVerified: false });
};

