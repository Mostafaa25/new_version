import User from '../../../auth/userAuth/model/userModel.js'
import Coach from '../../coachAuth/Model/coachModel.js';
const FindByEmail = async(email)=>{
    return await User.findOne({email}) 
}

const saveuser = async(userData)=>{
    const newuser = new User(userData)
    return await newuser.save()
}

const findUser = async (filter) => {
    return await User.findOne(filter);
}

 const findUserById = async (id) => {
  return await User.findById(id).select('-password');
};



export  {
    FindByEmail,
    saveuser ,
    findUser , 
    findUserById
    
}