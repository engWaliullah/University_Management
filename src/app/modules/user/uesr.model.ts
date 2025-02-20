import bcript from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['in-progress', 'block'],
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);



// pre save middleware/ hooks
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcript.hash(
    user.password,
    Number(config.bcript_salt_rounds),
  );
  next();
});

// post save middleware/ hooks
userSchema.post('save', function (doc, next) {
  doc.password = ' ';
  next();
});




export const User = model<TUser>('User', userSchema);
