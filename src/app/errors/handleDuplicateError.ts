import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";


const handleDuplicateError = (err : any) : TGenericErrorResponse => {


    const match = err?.message?.match(/"([^"]+)"/);
    const extractedMsg = match && match[1]

    const errorSources : TErrorSources = [{
        path: '',
        message: `${extractedMsg} -- department already exists. Please use another value`
    }]
    
    return {
        statusCode: 400,
        message: 'Duplicate value entered',
        errorSources
}}


export default handleDuplicateError;