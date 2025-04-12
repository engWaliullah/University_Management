import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/uesr.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check if the token is sent from the cleint
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!');
    }

    // check if the token is valid

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

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

    if (user?.passwordChangeAt && User.isJWTIssuedBeforeChangePassword(user?.passwordChangeAt, iat as number )) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !!');
    }

    // decoded undefined
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
