import ApiBase from './api-base';
import axios from "axios";

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

  getUserProfile = (userId: string) => {
    return axios.get(this.baseApiUrl + "/userprofile/" + userId);
  };

  getUserRoleScopes = () => {
    return axios.get(this.baseApiUrl + "/userrolecopes");
  };

  importFile = (fileUrl: string) => {
    return axios.post(this.baseApiUrl + "/import", { fileUrl: fileUrl });
  };
}
