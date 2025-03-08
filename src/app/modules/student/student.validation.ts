import { z } from 'zod';

// Zod validation for NameSchema
const NameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First Name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
});

// Zod validation for GurdianValidationSchema
const GurdianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father Name is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father Contact Number is required' }),
  motherName: z.string().min(1, { message: 'Mother Name is required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother Occupation is required' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother Contact Number is required' }),
});

// Zod validation for LocalGurdianValidationSchema
const LocalGurdianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local Gurdian Name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local Gurdian Occupation is required' }),
  address: z.string().min(1, { message: 'Local Gurdian Address is required' }),
});

// Zod validation for CreateStudentValidationSchema
const CreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(8, { message: 'Password is required' }),
    student: z.object({
      name: NameValidationSchema,
      gender: z.enum(['Female', 'Male']),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email format' }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']).optional(),
      contactNo: z.string().min(1, { message: 'Contact Number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency Contact Number is required' }),
      currentAddress: z
        .string()
        .min(1, { message: 'Current Address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent Address is required' }),
      gurdian: GurdianValidationSchema,
      localGurdian: LocalGurdianValidationSchema,
      admissionSemester: z.string(),
      admissionDepartment: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  CreateStudentValidationSchema,
};
