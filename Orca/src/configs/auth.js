export default {
  baserUrl: 'http://localhost:7043/',
  baseApiUrl: 'http://localhost:7043/api/',

  // baserUrl: 'http://localhost:8888/',
  // baseApiUrl: 'http://localhost:8888/api/',

  // baserUrl: 'http://thi360.com', 
  // baseApiUrl: 'http://thi360.com/api/',

  meEndpoint: '/auth/me',
  loginEndpoint: 'users/authenticate',
  googleLoginEndpoint: 'users/googlelogin',
  userInfoEndpoint: 'users/userinfo',
  registerEndpoint: 'users/register',
  verifyActivateCodeEndpoint: 'users/verify-acctivate-code',
  sendMailForgotPasswordEndpoint: 'users/send-mail-forgot-password',
  forgotPasswordEndpoint: 'users/forgot-password',
  storageTokenKeyName: 'accessToken',
  storageUserDataKeyName: 'userData',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
