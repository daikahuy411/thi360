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
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
