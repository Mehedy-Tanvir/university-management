/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();

  // Send a response without returning it
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Students fetched successfully!',
    data: result,
  });
});

const getStudentById = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentById(studentId);

  // Send a response without returning it
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Students fetched successfully!',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getStudentById,
};
