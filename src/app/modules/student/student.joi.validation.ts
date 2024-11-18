import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'string.pattern.base': 'First name first letter should be capital',
    }),
  middleName: Joi.string().optional().allow(''),
  lastName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'string.pattern.base': '{#label} must contain only alphabetic characters',
    }),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local guardian name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Occupation is required',
  }),
  contactNo: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.empty': 'Contact number is required',
      'string.pattern.base': 'Contact number should be between 10 to 15 digits',
    }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
  }),
});

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.empty': "Father's contact number is required",
      'string.pattern.base':
        "Father's contact number should be between 10 to 15 digits",
    }),
  motherName: Joi.string().required().messages({
    'string.empty': "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.empty': "Mother's contact number is required",
      'string.pattern.base':
        "Mother's contact number should be between 10 to 15 digits",
    }),
});

// Main Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'object.base': 'Name must be a valid object',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.empty': 'Gender is required',
    'any.only': 'Gender must be one of male, female, or other',
  }),
  dateOfBirth: Joi.string().isoDate().required().messages({
    'date.format': 'Date of birth must be in YYYY-MM-DD format',
    'string.isoDate': 'Date of birth must be a valid ISO date',
    'string.empty': 'Date of birth is required',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Must be a valid email address',
  }),
  contactNumber: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.empty': 'Contact number is required',
      'string.pattern.base': 'Contact number should be between 10 to 15 digits',
    }),
  emergencyContactNumber: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      'string.empty': 'Emergency contact number is required',
      'string.pattern.base':
        'Emergency contact number should be between 10 to 15 digits',
    }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .optional()
    .messages({
      'any.only': 'Blood group must be one of A+, A-, B+, B-, O+, O-, AB+, AB-',
    }),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian must be a valid object',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian must be a valid object',
  }),
  profileImage: Joi.string().uri().optional().messages({
    'string.uri': 'Profile image must be a valid URL',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': 'isActive status must be either active or blocked',
  }),
});

export default studentValidationSchema;
