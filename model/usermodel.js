import mongoose from "mongoose";
import validator from "validator";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

//......UserSchema........//

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required"],
        minlength: [3, "Username must contain atleast 3 characters"],
        maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true , "email required"],
        validate: [validator.isEmail, "Please provide a valid email !!"],
    },
    phone: {
        type: String, 
        required: [true, "Phone number required "]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [8, "Password must contain atleast 8 characters"],
        maxlength: [32, "Password cannot exceed 32 characters"],
    },
    role: {
        type: Boolean,
        required: true,
        enum: ["Job Seeker", "Employer"],
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

//......Hashing password.........// 

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
            
    } catch (error) {
        next(error)
    }
});

//........Comparing password........//

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//.......GenerateWebToken for authorisation........//

userSchema.methods.generateToken = async function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
} ;