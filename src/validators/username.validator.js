const { body, _param, _query } = expressValidator;
const userNamePayloadValidation = [
  body("user_name")
    .notEmpty()
    .withMessage(messages.cannotBeEmpty("user_name"))
    .custom((value) => {
        return /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(value)
    })
    .withMessage(messages.invalidFormat('user_name')),
]

module.exports = {
  userNamePayloadValidation,
};
