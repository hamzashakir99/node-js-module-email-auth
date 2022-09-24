module.exports = {
  appName: 'neesilo',
  saltRounds: 10,
  sendCodeEnums: {
    register: 'register',
    forgotPassword: 'forgot-password',
    changePassword: 'change-password',
    verifyEmail: 'email-verify',
  },
  userType: {
    users: 'user',
    superAdmin: 'super-admin',
    admin: 'admin',
  },
};