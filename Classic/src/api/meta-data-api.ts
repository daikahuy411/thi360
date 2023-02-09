import axios from 'axios';
import ApiBase from './api-base';

export default class MetaDataApi extends ApiBase {
  constructor() {
    super('metadatas');
  }

  getSetting = () => {
    const response = axios.get(`${this.baseApiUrl}/setting`);
    return response;
  };
}
