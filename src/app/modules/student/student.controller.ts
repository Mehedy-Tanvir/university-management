import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.zod.validation';

// import studentValidationSchema from './student.validation';

const createStudent: RequestHandler = async (req, res) => {
  try {
    const { student: studentData } = req.body;
    // data validation using joi
    // const { value, error } = studentValidationSchema.validate(studentData);
    // console.log(value, error);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong!',
    //     data: error.details,
    //   });
    // }

    // data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // Send a response without returning it
    res.status(200).json({
      success: true,
      message: 'Student is created successfully!',
      data: result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
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
