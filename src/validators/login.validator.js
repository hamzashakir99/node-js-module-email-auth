const { body } = expressValidator;
const { isEmail } = validator;
const loginPayloadValidation = [
    body("password")
        .notEmpty()
        .withMessage(messages.cannotBeEmpty("password")),
    body("email")
        .notEmpty()
        .withMessage(messages.cannotBeEmpty("email"))
        .custom((value) => isEmail(value, { domain_specific_validation: true }))
        .withMessage(messages.invalidFormat('email')),
]

module.exports = {
    loginPayloadValidation,
};