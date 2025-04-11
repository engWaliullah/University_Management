import httpStatus from 'http-status';
import AppError from "../../errors/AppError"
import { User } from "../user/uesr.model"
import { TLoginUser } from "./Auth.interface"
import jwt from 'jsonwebtoken';
import config from '../../config';


const loginUser = async ( payload : TLoginUser ) => {
    // check if the user is exists in the database
    const user = await User.isUserExistsByCustomId(payload.id);
    
    if (! user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user not found')
    }

    // check if the user is already deleted
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
        
    }

    // check the user is active or blocked 
    if (user?.status === 'block') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
    }

    // check if the password is correct 
    if (! await User.isPasswordMatched(payload.password, user.password)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
    }

    // Access Granted: Send Access Token, Refresh Token, and User Info
    // create token and sent to the client

    const jwtPayload = {
        userId : user?.id,
        role : user.role
    }
    
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' });

    return {
        accessToken,
        needsPasswordChange: user?.needPasswordChange
    }
}

export const AuthServices = {
    loginUser
}