import { Course } from "./course.model"
import { TCourse } from "./course.interface"
import QuireBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";

const createCourseIntoDB = async (payload : TCourse) => {
    const result = await Course.create(payload);
    return result
}

const getAllCourseFromDB = async (query : Record<string, unknown>) => {

    const courseQuery = new QuireBuilder(
        Course.find(),
        // .populate('preRequisiteCourses.course'),
        query
    ).search(CourseSearchableFields).filter().paginate().sort().fields()

    const result = await courseQuery.modelQuery;
    return result
}

const getSingleCourseFromDB = async (id : string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result
}

const updateSingleCourseIntoDB = (payload: Partial<TCourse>, id : string) => {

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
    deleteCourseFromDB
}