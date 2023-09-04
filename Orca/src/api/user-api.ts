import axios from 'axios'

import ApiBase from './api-base'

export default class UserApi extends ApiBase {
  constructor() {
    super('users');
  }

  save = (item: any) => {
    if (item.id === undefined || item.id == '0') {
      const url = `${this.baseApiUrl}`;
      const response = axios.post(url, item);
      return response;
    } else {
      const url = `${this.baseApiUrl}`;
      const response = axios.put(url, item);
      return response;
    }
  };

  getEmail = (token: string) => {
    return axios.get(this.baseApiUrl + "/fetch-email/" + token);
  };

  resendActivateCode = (token: string) => {
    return axios.get(this.baseApiUrl + "/resend-email-activate-code/" + token);
  };

  me = () => {
    return axios.get(this.baseApiUrl + "/me");
  };

  updateProfile = (request: any) => {
    const url = `${this.baseApiUrl}/UpdateProfile`;
    const response = axios.put(url, request, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  };

  changePassword = (param: any) => {
    const url = this.baseApiUrl + `/changepass/${param.oldPass}/${param.newPass}`;
    return axios.put(url);
  };

  // verifyAccount = (request: any) => {
  //   return axios.post(this.baseApiUrl + "/verify-acctivate-code", request );
  // };

  requestForgotPassword = (request: any) => {
    return axios.post(this.baseApiUrl + "/request-forgot-password", request);
  };

  verifyExpiteTime = (token: any) => {
    return axios.get(this.baseApiUrl + "/check-expire-time/" + token);
  };

  resetPassword = (request: any) => {
    return axios.post(this.baseApiUrl + "/reset-password/", request);
  };

  getUserProfile = (userId: string) => {
    return axios.get(this.baseApiUrl + "/userprofile/" + userId);
  };

  getUserRoleScopes = () => {
    return axios.get(this.baseApiUrl + "/userrolecopes");
  };

  importFile = (fileUrl: string) => {
    return axios.post(this.baseApiUrl + "/import", { fileUrl: fileUrl });
  };

  searchesUserNotInExam = (query: any) => {
    const response = axios.post(`${this.baseApiUrl}/SearchesUserNotInExam`, query);
    return response;
  };

  removeUserInClass = (request: any) => {
    const response = axios.delete(`${this.baseApiUrl}/RemoveUserInClass`, { data: request })
    return response;
  };
}
