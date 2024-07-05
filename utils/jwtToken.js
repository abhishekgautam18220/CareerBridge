export const sendToken = async(user, statusCode, res, message) => {
    const token = await user.generateToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        // secure: true
    }
    console.log(token);
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user, 
        message,
        token
    });
};