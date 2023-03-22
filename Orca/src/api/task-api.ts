import ApiBase from './api-base';
import axios from 'axios';

export default class TaskApi extends ApiBase {
  constructor() {
    super('tasks');
  }

  getContainers = () => {
    const url = `${this.baseApiUrl}/GetContainers`;
    const response = axios.get(url);
    return response;
  };

  getTaskById = (id: number) => {
    const url = `${this.baseApiUrl}/{id}`;
    const response = axios.get(url);
    return response;
  };
}
