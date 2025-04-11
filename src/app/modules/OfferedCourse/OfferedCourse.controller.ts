import httpStatus from 'http-status';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseService } from './OfferedCourse.service';

const createOfferedCourse = catchAsync( async (req: Request, res: Response) => {
    const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Offered Courses is updated succesfully',
        data: result,
      });
})

const getAllOfferedCourse = catchAsync( async (req: Request, res: Response) => {
    
})

const getSingleOfferedCourse = catchAsync( async (req: Request, res: Response) => {
    
})

const updateOfferedCourse = catchAsync( async (req: Request, res: Response) => {
    
})

const deleteOfferedCourse = catchAsync( async (req: Request, res: Response) => {
    
})


export const OfferedCourseControllers = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    updateOfferedCourse,
    deleteOfferedCourse,
}