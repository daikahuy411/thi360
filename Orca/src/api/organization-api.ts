import axios from 'axios'

import ApiBase from './api-base'

export default class OrganizationApi extends ApiBase {
  constructor() {
    super('organizations');
  }

  searchesOrganizations = () => {
    const response = axios.get(`${this.baseApiUrl}`);
    return response;
  };

  searchesClasses = (request: any) => {
    const response = axios.post(`${this.baseApiUrl}/Classes`, request);
    return response;
  };

  getOrganizationTree = () => {
    const response = axios.get(`${this.baseApiUrl}/GetOrganizationTree`);
    return response;
  };
  
  getClassTree = () => {
    const response = axios.get(`${this.baseApiUrl}/GetClassTree`);
    return response;
  };

  deleteMultipleOrganization = (request: any) => {
    const response = axios.delete(`${this.baseApiUrl}/batch`, { data: request })
    return response;
  };
}
