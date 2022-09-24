const { body } = expressValidator;
const { isEmail } = validator;
const emailPayloadValidation = [
  body("email")
    .notEmpty()
    .withMessage(messages.cannotBeEmpty("email"))
    .custom((value) => isEmail(value, { domain_specific_validation: true }))
    .withMessage(messages.invalidFormat('email')),
]

module.exports = {
  emailPayloadValidation,
};
