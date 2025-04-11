import httpStatus from 'http-status';
import AppError from "../../errors/AppError"
import { User } from "../user/uesr.model"
import { TLoginUser } from "./Auth.interface"
import bcrypt from 'bcrypt';


const loginUser = async ( payload : TLoginUser ) => {
    // check if the user is exists in the database
    
    if (!User.isUserExistsByCustomId(payload?.id)) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user not found')
    }

    // check if the user is already deleted
    // const isUserDeleted = isUserExists?.isDeleted;
    // if (isUserDeleted) {
    //     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
        
    // }

    // // check the user is active or blocked 
    // if (isUserExists?.status === 'block') {
    //     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
    // }

    // // check if the password is correct 
    // const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password)
   
    

    // Access Granted: Send Access Token, Refresh Token, and User Info

    return {}
}

export const AuthServices = {
    loginUser
}