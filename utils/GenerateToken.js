import dotenv from 'dotenv';
dotenv.config({path: 'D:\gymproject-master\config\.env'})
import jwt from 'jsonwebtoken';
const generateToken =(Payload)=>{
        console.log(process.env.JWTSECRETKEY);
    const token = jwt.sign(Payload , process.env.JWTSECRETKEY,{expiresIn : "1d"})
    return token
}
export {generateToken}