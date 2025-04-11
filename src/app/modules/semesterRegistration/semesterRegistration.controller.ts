import httpStatus from 'http-status';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req: Request, res: Response) => {

    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester-registration is created succesfully',
        data: result,
      });

});

const getAllSemesterRegistration = catchAsync(async (req: Request, res: Response) => {

    const result = await SemesterRegistrationService.getAllSemesterRegistrationFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All semester-registration is retrieve succesfully',
        data: result,
      });
});

const getSingleSemesterRegistration = catchAsync(async (req: Request, res: Response) => {

    const {id} = req.params;
    const result = await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester-registration is retrieve succesfully',
        data: result,
      });
});

const updateSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
    const {id} = req.params;
    const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester-registration is updated succesfully',
        data: result,
      });
});


export const SemesterRegistrationController = {
    createSemesterRegistration,
    getSingleSemesterRegistration,
    getAllSemesterRegistration,
    updateSemesterRegistration
}
