const errorHandler = (err, req, res, next) => {
  let message = err.message;
  let statusCode = err.statusCode || 500;

  if (err.statusCode === 11000) {
    if (message.includes("email")) message = "Email already exits";

    if (message.includes("tel")) message = "Telephone number already exits";
    if (message.includes("name")) message = "Name already exits";

    statusCode = 400;
  }
  res.status(statusCode).json({
    message: message,
    statusCode: statusCode,
  });
  next();
};
export default errorHandler;
