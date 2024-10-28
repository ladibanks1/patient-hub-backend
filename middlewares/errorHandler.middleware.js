
const errorHandler = (err, req, res, next) => {
    const message = err.message
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message : message,
        statusCode : statusCode
    });
    next()
};
export default  errorHandler