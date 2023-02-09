import axios from 'axios';
import { Configuration } from 'configs';
import User from 'interfaces/User';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class AuthService {
  setAxiosInterceptors = () => {
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          this.setSession(null);
          setTimeout(() => {
            window.location.href = "/lms/auth/login";
          }, 0);
        }
        return Promise.reject(error);
      }
    );
  };

  login = (userName: string, password: string) => {
    const url = `${Configuration.baseApiEndpoint}users/authenticate`;
    return axios.post(url, { "userName": userName, "password": password });
  };

  handleAuthentication() {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return;
    }
    this.setSession(accessToken);
  }

  logout = () => {
    this.setSession(null);
  };

  setSession = (accessToken: string | null) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      cookies.set('token', accessToken, { path: '/' });
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userProfile');
      delete axios.defaults.headers.common.Authorization;
      cookies.remove('token');
    }
  };

  getAccessToken = () => localStorage.getItem('accessToken');

  setUserProfile = (userProfile: any) => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  };

  getUserProfile = (): User => JSON.parse(localStorage.getItem('userProfile') ?? "{}");

  isAuthenticated = () => !!this.getAccessToken();
}

const authService = new AuthService();

export default authService;
