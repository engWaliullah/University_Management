import { Model } from "mongoose";

export interface TUser {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'student' | ' faculty';
  isDeleted: boolean;
  status: 'in-progress' | 'block';
};

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number;
  isUserExistsByCustomId(id: string) : Promise<TUser>
}