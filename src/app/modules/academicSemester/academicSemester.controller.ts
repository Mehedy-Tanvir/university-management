/* eslint-disable @typescript-eslint/no-unused-vars */
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  // Send a response without returning it
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
