import ApiBase from './api-base';
import axios from 'axios';

export default class OrganizationApi extends ApiBase {
  constructor() {
    super('organizations');
  }

  searchesOrganizations = () => {
    const response = axios.get(`${this.baseApiUrl}`);
    return response;
  };

  searchesClasses = () => {
    const response = axios.get(`${this.baseApiUrl}/Classes`);
    return response;
  };

  getOrganizationTree = () => {
    const response = axios.get(`${this.baseApiUrl}/GetOrganizationTree`);
    return response;
  };
}
