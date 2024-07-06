import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { User } from "../model/usermodel.js";
import { sendToken } from "../utils/jwtToken.js";

//........REGISTER HERE.........//

export const register = catchAsyncError(async (req, res, next) => {
    const {
        userName,
        email,
        phone,
        role,
        password
    } = req.body;

    if (!userName || !email || !phone || !role || !password) {
        return next(new ErrorHandler("Invalid Credentials !!"))
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) return next(new ErrorHandler("Email alrady exists"))
    const user = await User.create({
        userName,
        email,
        phone,
        role,
        password
    });

    sendToken(user, 200, res, "User Registered Successfully !!")
})

//........LOGIN HERE.........//

export const login = catchAsyncError(async (req, res, next) => {
    const { email,
        password,
        role,
    } = req.body;
    
    if (!email || !password || !role) return next(new ErrorHandler("Fill complete details", 400));

    const user = await User.findOne({ email }).select("+password")
    if (!user)
        return next(new ErrorHandler("Invalid Login Credentials", 400))

    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched)
        return next(new ErrorHandler("Invalid Login Credentials", 400))

    if (user.role !== role) return next(new ErrorHandler("User with this role not found", 400))

    sendToken(user, 200, res, "User logged in successfully ")
});

//........LOG OUT..........//

export const logout = catchAsyncError(async (req, res, next) => {
    res
        .status(201)
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "Logged Out"
        });
});

export const getUser = catchAsyncError(async(req, res, next)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    });
});