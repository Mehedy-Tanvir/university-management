import { Request, Response, RequestHandler } from 'express';
import { StudentServices } from './student.service';

const createStudent: RequestHandler = async (req, res) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createStudentIntoDB(studentData);

    // Send a response without returning it
    res.status(200).json({
      success: true,
      message: 'Student is created successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Student was not created!',
    });
  }
};

export const StudentControllers = {
  createStudent,
};
