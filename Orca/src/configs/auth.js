export default {
  baserUrl: 'http://localhost:7043/',
  baseApiUrl: 'http://localhost:7043/api/',

  // baserUrl: 'http://localhost:8888/',
  // baseApiUrl: 'http://localhost:8888/api/',

  // baserUrl: 'http://thi360.com', 
  // baseApiUrl: 'http://thi360.com/api/',

  meEndpoint: '/auth/me',
  loginEndpoint: 'v1/authenticate',
  googleLoginEndpoint: 'v1/googlelogin',
  userInfoEndpoint: 'users/userinfo',
  registerEndpoint: 'v1/register',
  verifyActivateCodeEndpoint: 'v1/verify-acctivate-code',
  sendMailForgotPasswordEndpoint: 'v1/send-mail-forgot-password',
  forgotPasswordEndpoint: 'v1/forgot-password',
  storageTokenKeyName: 'accessToken',
  storageUserDataKeyName: 'userData',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
