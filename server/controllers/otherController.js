import { catchAsyncError } from "../middlewares/catchAsyncErorr.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/Stats.js";

export const conatct = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("All fill all Field ", 400));
  }

  const to = process.env.MY_MAIL;

  const subject = "Conatct from Coding Courses";

  const text = `I am ${name} and my email is ${email}. \n ${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    sucess: true,
    message: "Your Message has been Sent, We will Contact you Soon",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return next(new ErrorHandler("All fill all Field ", 400));
  }

  const to = process.env.MY_MAIL;

  const subject = "Request for a Courses on Coding Courses";

  const text = `I am ${name} and my email is ${email}. \n ${course}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    sucess: true,
    message: "Your Request has been Sent",
  });
});

//Admin Dashboard

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find().sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }

  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({ users: 0, subscriptons: 0, views: 0 });
  }

  const userCounts = statsData[11].users;
  const subscriptonsCounts = statsData[11].subscriptons;
  const viewsCounts = statsData[11].views;

  let usersPercentage = 0,
    viewsPercentage = 0,
    subscriptonsPercentage = 0;

  let usersProfit = true,
    viewsProfit = true,
    subscriptonsProfit = true;

  if (statsData[10].users === 0) usersPercentage = userCounts * 100;
  if (statsData[10].subscriptons === 0)
    subscriptonsPercentage = subscriptonsCounts * 100;
  if (statsData[10].views === 0) viewsPercentage = viewsCounts * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      subscriptons: statsData[11].subscriptons - statsData[10].subscriptons,
      views: statsData[11].views - statsData[10].views,
    };

    usersPercentage = (difference.users / statsData[10].users) * 100;
    subscriptonsPercentage =
      (difference.subscriptons / statsData[10].subscriptons) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;

    if (usersPercentage < 0) usersProfit = false;
    if (subscriptonsPercentage < 0) subscriptonsProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    userCounts,
    subscriptonsCounts,
    viewsCounts,
    usersPercentage,
    subscriptonsPercentage,
    viewsPercentage,
    usersProfit,
    subscriptonsProfit,
    viewsProfit,
  });
});
