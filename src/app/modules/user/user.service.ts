import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';

const createStudentIntoDB = async (
  password: string | undefined,
  payload: TStudent,
) => {
  //   create a user object
  const userData: Partial<TUser> = {};
  // if password is not given use default password
  userData.password = password || (config.default_password as string);
  console.log({ password: userData.password });
  // set student role

  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // transaction roll back
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //   manually generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    //   create a user transaction-1
    const newUser = await User.create([userData], { session });

    // newUser array

    //   create a student
    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    // create student transaction 2
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(400, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDB,
};
