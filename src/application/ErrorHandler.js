import { Log } from "../services/Log";

export const ErrorHandler = (error, request, response, next) => {
    Log.error("Uncaught Error", error);
    response.send(error.message);
};