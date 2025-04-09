import httpStatus from 'http-status';
import { Course, CourseFaculty } from "./course.model"
import { TCourse, TCoursefaculty } from "./course.interface"
import QuireBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";

const createCourseIntoDB = async (payload : TCourse) => {
    const result = await Course.create(payload);
    return result
}

const getAllCourseFromDB = async (query : Record<string, unknown>) => {

    const courseQuery = new QuireBuilder(
        Course.find().populate('preRequisiteCourses.course'),
        query
    ).search(CourseSearchableFields).filter().paginate().sort().fields()

    const result = await courseQuery.modelQuery;
    return result
}

const getSingleCourseFromDB = async (id : string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result
}

const updateSingleCourseIntoDB = async (payload: Partial<TCourse>, id : string) => {
    const {preRequisiteCourses, ...courseRemainingData} = payload;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

            // step 1: update basic course data
    const updatedBasicCourseData = Course.findByIdAndUpdate(
        id,
        courseRemainingData,
        {
            new: true,
            runValidators: true,
            session
        }
    )

    // console.log(preRequisiteCourses);


    if (!updatedBasicCourseData) {
       throw new AppError(httpStatus.BAD_REQUEST, "failed to updating course data")
    }
    
    // check if there is any preRequisiteCourses to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        // filter out the deleted fields 
        const deletedPreRequisites = preRequisiteCourses?.filter(el => el?.course && el?.isDeleted)
        console.log(deletedPreRequisites);

        const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
            id,
            {
                $pull: {  preRequisiteCourses: { course: { $in: deletedPreRequisites } } }
            },
            {
                new: true,
                runValidators: true,
                session
            }
        )

        if (!deletedPreRequisiteCourses) {
            throw new AppError(httpStatus.BAD_REQUEST, "failed to updating course data")
         }
        
        // filter out the new courses fields 
    const newPrerequisites = preRequisiteCourses?.filter(el => el?.course && !el?.isDeleted);

    const newPrerequisitesCourses = await Course.findByIdAndUpdate(
        id,
        {
            $addToSet: { preRequisiteCourses: { $each: newPrerequisites } }
        },
        {
            new: true,
            runValidators: true,
            session
        }
    ) 

    if (!newPrerequisitesCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "failed to updating course data")
     }
} 
        await session.commitTransaction();
        await session.endSession();

        const result = await Course.findById(id).populate('preRequisiteCourses.course');
        return result;
        
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, "failed to updating course data")
    }
}

const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCoursefaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: {faculties: {$each: payload}}
        },
        {
            upsert: true,
            new: true,
        }
    )
    return result
}

const removeFacultiesFromCourseFromDB = async (id: string, payload: Partial<TCoursefaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $pull: {faculties: {$in: payload}}
        },
        {
            new: true,
        }
    )
    return result
}

const deleteCourseFromDB = async ( id : string ) => {
    const result = await Course.findByIdAndUpdate(
        id,
        {isDeleted: true},
        {new: true}
    )
    return result
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    updateSingleCourseIntoDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesFromCourseFromDB,
    deleteCourseFromDB
}