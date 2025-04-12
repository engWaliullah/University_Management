import bcrypt from 'bcrypt';
import config from '../../config';
import httpStatus from 'http-status';
import { User } from './../user/uesr.model';
import AppError from '../../errors/AppError';
import { TLoginUser } from './Auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createToken } from './Auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // check if the user is exists in the database
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found');
  }

  // check if the user is already deleted
  const isUserDeleted = user?.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // check the user is active or blocked
  if (user?.status === 'block') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // check if the password is correct
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // Access Granted: Send Access Token, Refresh Token, and User Info
  // create token and sent to the client

  const jwtPayload = {
    userId: user?.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByCustomId(userData?.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found');
  }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  if (user?.status === 'block') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  if (!(await User.isPasswordMatched(payload?.oldPassword, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
  }

  const newHaashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcript_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    {
      password: newHaashedPassword,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  
  // check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found');
  }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  if (user?.status === 'block') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  if (
    user?.passwordChangeAt &&
    User.isJWTIssuedBeforeChangePassword(user?.passwordChangeAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!');
  }
  
  const jwtPayload = {
    userId: user?.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken
  }

};

const forgetPassword = async (id: string) => {

  const user = await User.isUserExistsByCustomId(id);


  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'This user not found');
  // }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  if (user?.status === 'block') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `http://localhost:3000?id=${user?.id}&token=${accessToken}`
  console.log(resetUILink);
  
}

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword
};
