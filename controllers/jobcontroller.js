import { catcheAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Job } from "../model/JobModel.js";

export const getAllJobs = catcheAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200)
        .json({
            success: true,
            jobs,
        });
});

export const postJobs = catcheAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Your role is not Compaitable", 400));
    }
    const postedBy = req.user._id;
    const {
        title,
        description,
        category,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo
    } = req.body;

    if (!title || !description || !category || !location) {
        return next(new ErrorHandler("Provide Full Details"), 400);
    }
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("Range salary or fixed salary is required"));
    }
    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandler("Range salary and fixed salary cannot be entered together"));
    }
    const job = await Job.create({
        title,
        description,
        category,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy
    })
    res.status(200).json({
        success: true,
        message: "Job posted successfully !!",
        job
    });
});

export const getMyJobs = catcheAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Your role is not Compaitable", 400));
    }
    const myJobs = await Job.find({ postedBy: req.user._id });
    res.status(200)
        .json({
            success: true,
            myJobs,
        });
});

export const updateJob = catcheAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Your role is not Compaitable", 400));
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Job not found !!", 400));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        job,
        message: "Job updated !!"
    });
});

export const deleteJob = catcheAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Your role is not Compaitable", 400));
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Job not found !!", 400));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job Deleted !!"
    })
})
