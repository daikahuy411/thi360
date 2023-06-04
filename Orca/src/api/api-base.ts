import axios from 'axios'

import Configuration from '../configs/auth'

class ApiBase {
  baseApiUrl: string;

  constructor(url: string) {
    this.baseApiUrl = Configuration.baseApiUrl + url;
  }

  get = (id: number) => {
    const url = `${this.baseApiUrl}/${id}`;
    const response = axios.get(url);
    return response;
  };

  getAll = (query: any) => {
    const url = `${this.baseApiUrl}`;
    const response = axios.get(url);
    return response;
  };

  searches = (query: any) => {
    const url = `${this.baseApiUrl}/searches`;
    if (!query) {
      query = { limit: 50, start: 0 };
    }
    const response = axios.post(url, query);
    return response;
  };

  save = (item: any) => {
    if (item.id > 0) {
      return this.put(item);
    } else {
      return this.post(item);
    }
  };

  post = (item: any) => {
    const url = `${this.baseApiUrl}`;
    const response = axios.post(url, item);
    return response;
  };

  put = (item: any) => {
    const url = `${this.baseApiUrl}/${item.id}`;
    const response = axios.put(url, item);
    return response;
  };

  delete = (item: any) => {
    const url = `${this.baseApiUrl}`;
    const response = axios.delete(`${url}/${item.id}`);
    return response;
  };

  deleteMultiple = (request: any) => {
    const response = axios.delete(`${this.baseApiUrl}/batch`, { data: request })
    return response;
  };
}

export default ApiBase;
