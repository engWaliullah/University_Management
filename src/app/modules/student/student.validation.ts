import { z } from 'zod';

// Zod validation for NameSchema
const createNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First Name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
});

const updateNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First Name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' }).optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last Name is required' }).optional(),
});

// Zod validation for GurdianValidationSchema
const createGurdianValidationSchema = z.object({
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

const updateGurdianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father Name is required' }).optional(),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father Occupation is required' }).optional(),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father Contact Number is required' }).optional(),
  motherName: z.string().min(1, { message: 'Mother Name is required' }).optional(),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother Occupation is required' }).optional(),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother Contact Number is required' }).optional(),
});

// Zod validation for LocalGurdianValidationSchema
const createLocalGurdianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local Gurdian Name is required' }),
  occupation: z
    .string()
    .min(1, { message: 'Local Gurdian Occupation is required' }),
  address: z.string().min(1, { message: 'Local Gurdian Address is required' }),
});

const updateLocalGurdianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local Gurdian Name is required' }).optional(),
  occupation: z
    .string()
    .min(1, { message: 'Local Gurdian Occupation is required' }).optional(),
  address: z.string().min(1, { message: 'Local Gurdian Address is required' }).optional(),
});

// Zod validation for CreateStudentValidationSchema
const CreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(8, { message: 'Password is required' }),
    student: z.object({
      name: createNameValidationSchema,
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
      gurdian: createGurdianValidationSchema,
      localGurdian: createLocalGurdianValidationSchema,
      admissionSemester: z.string(),
      admissionDepartment: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
});

const UpdateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateNameValidationSchema.optional(),
      gender: z.enum(['Female', 'Male']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email format' }).optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']).optional(),
      contactNo: z.string().min(1, { message: 'Contact Number is required' }).optional(),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency Contact Number is required' }).optional(),
      currentAddress: z
        .string()
        .min(1, { message: 'Current Address is required' }).optional(),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent Address is required' }).optional(),
      gurdian: updateGurdianValidationSchema.optional(),
      localGurdian: updateLocalGurdianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      admissionDepartment: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  CreateStudentValidationSchema,
  UpdateStudentValidationSchema
};
