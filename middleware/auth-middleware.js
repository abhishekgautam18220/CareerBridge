import {catcheAsyncError} from './catchAsyncError.js'
import ErrorHandler from './error.js'
import jwt from 'jsonwebtoken'
import { User } from '../model/usermodel.js'

export const isAuthorised = catcheAsyncError(async(req, res, next)=>{
    const token = req.cookies.token;
    
    if(!token){
        return next(new ErrorHandler("User not authorised", 400))
    }

     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return next(new ErrorHandler("User not found", 404));
        }

        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }

})