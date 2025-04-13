import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
 return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};


export const verifyToken = (token: string, secret: string) => {
    // check if the token is valid
    return jwt.verify(
      token,
      secret as string,
    ) as JwtPayload;
}