exports.validateId = async(req, res, next) => {
  try {
    const { _id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
      await utils.res.response(res, messages.invalidId, false, 200, null)
    }
    else{
      next();
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
};
exports.validateIdGetRequest = async(req, res, next) => {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
      await utils.res.response(res, messages.invalidId, false, 200, null)
    }
    else{
      next();
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
};
