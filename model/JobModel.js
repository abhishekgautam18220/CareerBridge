import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Job title required"],
        minlength: [2, "Job title too short"],
        maxlength: [50, "Job title cannot contain more than 50 characters"]
    },
    description: {
        type: String,
        required: true,
        minlength: [10, "Description too short (50)"],
        maxlength: [1000, "Description too long (1000)"],
    },
    category: {
        type: String,
        required: [true, "Job category is required"]
    },
    location: {
        type: String,
        required: [true, "Job location is required"],
        minlength: [10, "Please provide full location"]
    },
    fixedSalary: {
        type: Number,
        minlength: [4, "Salary is too less in this expensive world"],
        maxlength: [10, "Please provide proper salary"]
    },
    salaryFrom: {
        type: Number,
        minlength: [4, "Salary is too less in this expensive world"],
        maxlength: [10, "Please provide proper salary"]
    },
    salaryTo: {
        type: Number,
        minlength: [4, "Salary is too less in this expensive world"],
        maxlength: [10, "Please provide proper salary"]
    },
    expired: {
        type: Boolean,
        default: false
    },
    jobPostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },


})

export const Job = mongoose.model("Job", JobSchema);