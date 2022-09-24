const { validationResult } = require("express-validator");
exports.request = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await utils.res.response(res, errors.array()[0].msg, false, 200, null)
    }
    else {
      next();
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
};
