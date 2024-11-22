import { z } from 'zod';

// UserName Zod Schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .regex(/^[A-Z][a-z]*$/, {
      message: 'First name first letter should be capital',
    }),
  middleName: z.string().optional(),
  lastName: z.string().regex(/^[A-Za-z]+$/, {
    message: 'Last name must contain only alphabetic characters',
  }),
});

// Local Guardian Zod Schema
const localGuardianSchema = z.object({
  name: z.string().min(1, { message: 'Local guardian name is required' }),
  occupation: z.string().min(1, { message: 'Occupation is required' }),
  contactNo: z.string().regex(/^\d{10,15}$/, {
    message: 'Contact number should be between 10 to 15 digits',
  }),
  address: z.string().min(1, { message: 'Address is required' }),
});

// Guardian Zod Schema
const guardianSchema = z.object({
  fatherName: z.string().min(1, { message: "Father's name is required" }),
  fatherOccupation: z
    .string()
    .min(1, { message: "Father's occupation is required" }),
  fatherContactNo: z.string().regex(/^\d{10,15}$/, {
    message: "Father's contact number should be between 10 to 15 digits",
  }),
  motherName: z.string().min(1, { message: "Mother's name is required" }),
  motherOccupation: z
    .string()
    .min(1, { message: "Mother's occupation is required" }),
  motherContactNo: z.string().regex(/^\d{10,15}$/, {
    message: "Mother's contact number should be between 10 to 15 digits",
  }),
});

// Main Student Zod Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, { message: 'Student ID is required' }),
  password: z.string(),
  name: userNameSchema,
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Gender must be one of male, female, or other',
  }),
  dateOfBirth: z
    .string()
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: 'Date of birth must be in YYYY-MM-DD format',
    })
    .optional(),
  email: z
    .string()
    .email({ message: 'Must be a valid email address' })
    .min(1, { message: 'Email is required' }),
  contactNumber: z.string().regex(/^\d{10,15}$/, {
    message: 'Contact number should be between 10 to 15 digits',
  }),
  emergencyContactNumber: z.string().regex(/^\d{10,15}$/, {
    message: 'Emergency contact number should be between 10 to 15 digits',
  }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .optional(),
  presentAddress: z.string().min(1, { message: 'Present address is required' }),
  permanentAddress: z
    .string()
    .min(1, { message: 'Permanent address is required' }),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: z
    .string()
    .url({ message: 'Profile image must be a valid URL' })
    .optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentValidationSchema;
