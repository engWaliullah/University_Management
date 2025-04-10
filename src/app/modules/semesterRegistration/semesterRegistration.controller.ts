import { catchAsync } from "../../utils/catchAsync";

const createSemesterRegistration = catchAsync(async (req, res) => {});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {});
const getSemesterRegistration = catchAsync(async (req, res) => {});
const updateSemesterRegistration = catchAsync(async (req, res) => {});


export const SemesterRegistrationController = {
    createSemesterRegistration,
    getSingleSemesterRegistration,
    getSemesterRegistration,
    updateSemesterRegistration
}
