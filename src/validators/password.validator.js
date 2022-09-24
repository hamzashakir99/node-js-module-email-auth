const { body } = expressValidator;
const { isStrongPassword } = validator;
const passwordPayloadValidation = [
  body("password")
    .notEmpty()
    .withMessage(messages.cannotBeEmpty("password"))
    .custom((value) => isStrongPassword(value))
    .withMessage(messages.invalidFormat('password')),
]

module.exports = {
    passwordPayloadValidation,
};