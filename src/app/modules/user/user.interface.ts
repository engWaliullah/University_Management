import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangeAt?: Date;
  role: 'super-admin' | 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
  status: 'in-progress' | 'block';
};

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExistsByCustomId(id: string) : Promise<TUser>;
  isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>;
  isJWTIssuedBeforeChangePassword: (passwordChangedTimestamp : Date, jwtTimestamp: number) => boolean;
}

export type TUserRole = keyof typeof USER_ROLE;