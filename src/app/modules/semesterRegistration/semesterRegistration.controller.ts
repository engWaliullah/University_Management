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
const getSingleSemesterRegistration = catchAsync(async (req: Request, res: Response) => {});
const getSemesterRegistration = catchAsync(async (req: Request, res: Response) => {});
const updateSemesterRegistration = catchAsync(async (req: Request, res: Response) => {});


export const SemesterRegistrationController = {
    createSemesterRegistration,
    getSingleSemesterRegistration,
    getSemesterRegistration,
    updateSemesterRegistration
}
