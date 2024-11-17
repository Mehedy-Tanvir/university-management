import { RequestHandler } from 'express';
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
      message: 'Something went wrong!',
    });
  }
};

const getAllStudents: RequestHandler = async (req, res) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    // Send a response without returning it
    res.status(200).json({
      success: true,
      message: 'Students fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

const getStudentById: RequestHandler = async (req, res) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentById(studentId);

    // Send a response without returning it
    res.status(200).json({
      success: true,
      message: 'Student fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getStudentById,
};
