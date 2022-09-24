exports.status = async(req, res, next) => {
    try {
        if(!req.user.email_verify){
            await utils.res.response(res, messages.emailNotVerify, false, 201, null)
        }
        if(!req.user.two_factor_verify){
            await utils.res.response(res, messages.twoFactorVerify, false, 202, null)
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
};

exports.isSuperAdmin = async(req, res, next) => {
    try {
        if(req.user.user_type == dataConstraint.userType.superAdmin){
            next()
        }
        else {
            await utils.res.response(res, messages.notPermission('module'), false, 200, null)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
};