exports.checkPagination = async (req, res, next) => {
    try {
        const { skip, limit } = req.query;
        if (isNaN(skip) || isNaN(limit) || Number(limit) > 20) {
            await utils.res.response(res, messages.invalidParams("parameters"), false, 200, null);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};
