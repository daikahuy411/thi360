export default {
  baserUrl: 'https://localhost:7043/',
  baseApiUrl: 'https://localhost:7043/api/',

  // baserUrl: 'http://localhost:8888/',
  // baseApiUrl: 'http://localhost:8888/api/',

  // baserUrl: 'http://beta.thi360.com',
  // baseApiUrl: 'http://beta.thi360.com/api/',

  meEndpoint: '/auth/me',
  loginEndpoint: 'users/authenticate',
  googleLoginEndpoint: 'users/googlelogin',
  userInfoEndpoint: 'users/userinfo',
  registerEndpoint: 'users/register',
  verifyActivateCodeEndpoint: 'users/verify-acctivate-code',
  storageTokenKeyName: 'accessToken',
  storageUserDataKeyName: 'userData',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
