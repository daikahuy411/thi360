import ApiBase from './api-base';
import axios from 'axios';

export default class ProjectApi extends ApiBase {
  constructor() {
    super('projects');
  }

  getProject = (
    keyword: string,
    status: number
  ) => {
      const url = `${this.baseApiUrl}/Searches`;
      const response = axios.post(url, {
        Keyword: keyword,
        Status: status
      });
      return response;
    };

  getProjectById = (id: number) => {
    const url = `${this.baseApiUrl}/{id}`;
    const response = axios.get(url);
    return response;
  };
}
