export default {
  // baserUrl: 'http://localhost:7043/',
  // baseApiUrl: 'http://localhost:7043/api/',

  baserUrl: 'http://beta.thi360.com',
  baseApiUrl: 'http://beta.thi360.com/api/',

  meEndpoint: '/auth/me',
  loginEndpoint: 'users/authenticate',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
