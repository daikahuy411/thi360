import ApiBase from './api-base';
import axios from "axios";

export default class DashboardApi extends ApiBase {
  constructor() {
    super('dashboard');
  }

  getDashboard = (id: number) => {
    const url = `${this.baseApiUrl}`;
    const response = axios.get(url);
    return response;
  };

}
