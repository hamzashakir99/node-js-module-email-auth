module.exports = {
  generalError: "Something went wrong.",
  InvalidToken: "Invalid token.",
  signedIn: "You have been signed in successfully",
  userNotFound: "Couldn't find your Account",
  success: "Success!",
  verified: "Email verified successfully",
  resendCode: "verification code has been sent to you again",
  invalidId: 'Please provide a valid id',
  badRequest: "Bad request",
  emailExists: "Email already exists!",
  sessionExpiry: "Session has been expired!",
  weakPassword: 'Invalid password, please use at-least one uppercase ( A-Z), one digit ( 0-9) and one character.',
  emailNotVerify: 'Sorry, your email is not verified. Kindly first verify your email',
  wrongCredentials: 'Sorry, Login phone and password are incorrect',
  passwordReset: 'Your password is successfully changed. Please Login',
  passwordChanged: 'Your password is successfully changed.',
  wrongPassword: 'Your old password is not correct',
  emailVerified: 'Your email is successfully verified',
  logoutSuccess: 'You have successfully logout',
  alreadyPhone: 'Another user with this phone number already exists',
  alreadyUserName: 'Another user with this user name already exists',
  codeSendSuccessfully: 'Code send to your email successfully',
  noOneRegisteredWithEmail: 'Sorry, we cannot find any account with your provided email.',
  emailAlreadyVerified: 'The provided email is already verified.',
  codeExpired: 'Account activation code has been expired.',
  invalidCode: 'Invalid code. Please provide a valid code.',
  incorrectPassword: 'The password that you\'ve entered is incorrect.',
  domainCreated: 'Your domain was created successfully, Please wait for deployment. Meanwhile you leave this page, We notify you once it done',
  logoutUser: 'You have successfully logged out from device',
  categoryAdded: 'Your category added successfully',
  notUpdated: 'Record not updated.',
  recordNotFound: 'Record not found',
  subCategoryNotMatch: 'Your one of sub categories does not match',
  categoryNotFound: 'Could not find any category',
  twoFactorVerify: 'Please verify your login credentials with two factor authentication.',
  invalidFormat: (key) => {
    return `Please enter a valid format ${key}`;
  },
  cannotBeEmpty: (key) => {
    return `${key} cannot be empty`;
  },
  objectExists: (key, values) => {
    return `Another ${key} with this ${values} already exists.`
  },
  errorOnCreate: (key) => {
    return `Some error occurred while creating your ${key} database. Please try again later.`;
  },
  recordUpdated: (key) => `Your ${key} information is successfully updated`,
  notFound: (key, value) => `Your ${key} with this ${value} is not found`,
  notPermission: (value) => `You have not authorized this user to access this ${value}`,
  underDevelopment: (value) => `${value} is under development`,
  limitMustBeLessThen: (value) => `Limit must be less than or equal to ${value}.`,
  invalidParams: (value) => `Invalid ${value} provided.`,
};
