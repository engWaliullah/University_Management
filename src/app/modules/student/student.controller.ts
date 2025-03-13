import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

const getAllStudentController = catchAsync(async (req, res, next) => {
  // console.log(req.query);
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data retrieved successfully',
    data: result,
  });
});

const getSingleStudentController = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student data retrieved successfully',
    data: result,
  });
});

const updateSingleStudentController = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const {student} = req.body;
  const result = await StudentServices.updateSingleStudentFromDB(studentId, student);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Single Student successfully',
    data: result,
  });
});

const deleteSingleStudentController = catchAsync(async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Student deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export const StudentController = {
  getAllStudentController,
  getSingleStudentController,
  deleteSingleStudentController,
  updateSingleStudentController
};
