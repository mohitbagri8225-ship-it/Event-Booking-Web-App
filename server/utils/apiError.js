class ApiError extends Error {
    constructor(
        message = "Internal Server Error",
        statusCode,
        error = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.stack = stack;
        this.data =  null;
        this.message = message;
        this.success = false;
        this.error = error;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;