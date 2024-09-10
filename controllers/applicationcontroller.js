import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Job } from "../model/JobModel.js";
import { Application } from "../model/applicationModel.js";
import cloudinary from "cloudinary";

export const employerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Your role is not Compaitable", 400));
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerId.user": _id });
    res.status(200).json({
        success: true,
        applications
    })
})

export const jobSeekerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("Your role is not Compaitable", 400));
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantId.user": _id });
    res.status(200).json({
        success: true,
        applications
    });
});

export const jobSeekerDeleteApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("You cannot delete this application", 400));
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
            return next(new ErrorHandler("No application found", 404));
    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "Application deleted !!"
    });
});

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("Employer cannot for apply application", 400));
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Resume file required",400))

    }
    const { resume } = req.files;
    const allowedFormats = ['image/png', 'image/jpg', 'image/webp']
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler("Invalid file type please choose PNG , JPG or WEBP", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console, log("cloudianry Error", cloudinaryResponse.error || "Unknown Cloudinary error ");
        return next(new ErrorHandler("Failed to upload resume", 500))
    }
    const {
        name,
        email,
        coverLetter,
        address,
        phone,
        jobId
    } = req.body;
    const applicantId = {
        user: req.user._id,
        role: "Job Seeker"
    };
    if (!jobId) {
        return next(new ErrorHandler("Job not found", 404));
    }
    const jobDetails = await Job.findById(jobId); 

    if (!jobDetails) {
        return next(new ErrorHandler("Job not found", 404))
    }
    const employerId = {
        user: jobDetails.postedBy,
        role: "Employer"
    }
    if (!name || !email || !coverLetter || !phone || !applicantId || !address || !employerId || !resume) {
        return next(new ErrorHandler("Incomplete details", 400));
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        address,
        phone,
        applicantId,
        employerId,
        resume:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })
    res.status(201).json({
        success:true,
        message: "Application Submited",
        application,
    })
});