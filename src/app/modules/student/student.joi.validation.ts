import Joi from 'joi';

const NameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.empty': 'First Name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'string.pattern.base': '{#label} is not in capitalize format',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string().required().messages({
    'string.empty': 'Last Name is required',
  }),
});

const GurdianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': 'Father Contact Number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.empty': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': 'Mother Contact Number is required',
  }),
});

const LocalGurdianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Local Gurdian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Occupation is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required',
  }),
});

const StudentValidationSchema = Joi.object({
  id: Joi.string().optional(),
  name: NameValidationSchema.required(),
  gender: Joi.string().valid('Female', 'Male').required().messages({
    'any.only': '{#label} is not valid',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-')
    .required()
    .messages({
      'any.only': 'Blood group is not valid',
      'string.empty': 'Blood group is required',
    }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.empty': 'Emergency Contact Number is required',
  }),
  currentAddress: Joi.string().required().messages({
    'string.empty': 'Current Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent Address is required',
  }),
  gurdian: GurdianValidationSchema.required(),
  localGurdian: LocalGurdianValidationSchema.required(),
  profileImage: Joi.string().optional(),
  active: Joi.string().valid('active', 'blocked').default('active'),
});

export default StudentValidationSchema;
