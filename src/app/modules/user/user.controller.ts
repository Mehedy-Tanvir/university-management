/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  // Send a response without returning it
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
