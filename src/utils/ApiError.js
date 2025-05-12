class ApiError extends Error {
    constructor(message, statusCode, err = null) {
        super(message);
        this.statusCode = statusCode;
        this.err = err;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
