module.exports.response = (res, message, is_success, status, data) => {
    res.status(status).json({
        message,
        is_success,
        data
    });
}