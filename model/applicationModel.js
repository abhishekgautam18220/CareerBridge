import validator from "validator";
import mongoose from "mongoose";

export const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username required"],
        minlength: [3, "name must contain atleast 3 characters"],
        maxlength: [30, "name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "email required"],
        validate: [validator.isEmail, "Please provide a valid email !!"],
    },
    coverLetter: {
        type: String,
        required: [true, "Please provide your coverlLetter"]
    },
    address: {
        type: String,
        required: [true, "Please provide your address"]
    },
    phone: {
        type: String,
        required: [true, "Phone number required "]
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    applicantId:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required: true
        }
    },
    employerId:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role:{
            type:String,
            enum:["Employer"],
            required: true
        }
    }
});

export const Application = mongoose.model("Application", applicationSchema)