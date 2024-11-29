import { NextFunction, RequestHandler } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';

const getAllStudents: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    // Send a response without returning it
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Students fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById: RequestHandler = async (req, res, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentById(studentId);

    // Send a response without returning it
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Students fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  getStudentById,
};
