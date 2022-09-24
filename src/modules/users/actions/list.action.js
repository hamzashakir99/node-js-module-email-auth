exports.getProfile = async (req, res, next) => {
    try {
        const { user } = req;
        await utils.res.response(res, messages.success, true, 200, await utils.calculate.deleteKeys(user, ['password', 'verification_code', 'expire_date']))
    } catch (error) {
        console.log(error)
        next(error)
    }
}