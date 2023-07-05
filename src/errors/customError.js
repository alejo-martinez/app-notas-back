export default class customError {
    static createError({name, cause, message, code}){
        const error = new Error();
        error.name = name;
        error.cause = cause;
        error.message = message;
        error.code = code;
        throw error;
    }
}