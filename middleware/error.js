class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next)=>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.name === "CaseError"){
        const meaasge = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }
    if(err.code === 11000){
        const meaasge = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    } 
    if(err.name === "JsonWebTokenError"){
        const meaasge = `Token Invalid. Try Again`
        err = new ErrorHandler(message, 400)
    } 
    if(err.name === "TokenExpiredError"){
        const meaasge = `Token is Expired. Try Again`
        err = new ErrorHandler(message, 400)
    }
    return res.status(err.statusCode).json({ 
        success:false,
        message: err.messsge 
    });
};

export default ErrorHandler ;