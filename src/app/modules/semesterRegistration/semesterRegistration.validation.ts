import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";


const createSemesterRegistrationVadationSchema = z.object({
    body: z.object({
academicSemester: z.string(),
    status: z.enum([...SemesterRegistrationStatus] as [string, ...string[]]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(), 
    })
})


export const semesterRegistrationValidation = {
    createSemesterRegistrationVadationSchema
}