import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

const getAllStudentController = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data retrieved successfully',
    data: result,
  });
});

const getSingleStudentController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Student data retrieved successfully',
    data: result,
  });
});

const updateSingleStudentController = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {student} = req.body;
  const result = await StudentServices.updateSingleStudentFromDB(id, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Update Single Student successfully',
    data: result,
  });
});

const deleteSingleStudentController = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(id);
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
